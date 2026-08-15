// ==========================================
// 1. SELECTOR CONFIGURATION
// ==========================================
const PLATFORMS = {
  "chatgpt.com": {
    name: "ChatGPT",
    messageNode: "[data-message-author-role]",
    isUser: (node) => node.getAttribute("data-message-author-role") === "user",
    getHtml: (node) => node.innerHTML,
  },
  "gemini.google.com": {
    name: "Gemini",
    messageNode: "user-query, response-container",
    isUser: (node) => node.tagName.toLowerCase() === "user-query",
    getHtml: (node) => {
      const clone = node.cloneNode(true);
      const mainContent = clone.querySelector(".message-content, .model-response-text, .query-text") || clone;
      return mainContent.innerHTML;
    },
  },
  "claude.ai": {
    name: "Claude",
    messageNode: ".font-user-message, .font-claude-message",
    isUser: (node) => node.classList.contains("font-user-message"),
    getHtml: (node) => node.innerHTML,
  },
};

// ==========================================
// 2. PRE-PROCESSING HELPERS
// ==========================================

// Safely extracts raw LaTeX from the DOM before Markdown strips it
function preserveMath(cloneNode) {
  const mathNodes = cloneNode.querySelectorAll(".math-inline, .math-block, .katex, mjx-container");
  mathNodes.forEach((node) => {
    let tex = "";

    // 1. Check hidden MathML annotation tag (Primary Target)
    const annotation = node.querySelector("annotation");
    if (annotation) tex = annotation.textContent;

    // 2. Check inner <math> element's alttext attribute
    if (!tex) {
      const mathTag = node.querySelector("math");
      if (mathTag) tex = mathTag.getAttribute("alttext");
    }

    // 3. Check container data attributes
    if (!tex) tex = node.getAttribute("data-tex") || node.getAttribute("data-math");

    // 4. Check MathJax (ChatGPT) aria-label
    if (!tex && node.tagName.toLowerCase() === "mjx-container") {
      const mjxMath = node.querySelector("mjx-math");
      if (mjxMath) tex = mjxMath.getAttribute("aria-label");
    }

    // Lock the extracted TeX directly onto the node for Turndown to read safely
    if (tex) {
      tex = tex.replace(/^ParseError:\s*KaTeX\s*parse\s*error:\s*[^:]+:\s*/i, ""); // Strip errors
      tex = tex.replace(/^\$+/, "").replace(/\$+$/, "").trim(); // Prevent $$$$ stacking
      node.setAttribute("data-raw-tex", tex);
    }
  });
}

// Handles Blob URLs natively & fetches true currentSrc
async function processImages(cloneNode, originalNode) {
  const cloneImages = cloneNode.querySelectorAll("img");
  const originalImages = originalNode.querySelectorAll("img");

  for (let i = 0; i < cloneImages.length; i++) {
    const img = cloneImages[i];
    if (img.closest(".katex, mjx-container, .math-inline, .math-block")) continue;

    const origImg = originalImages[i];
    if (!origImg) continue;

    // Grab the true URL from the browser's active engine
    let src = origImg.currentSrc || origImg.src || origImg.getAttribute("src") || origImg.getAttribute("data-src");
    if (!src) continue;

    img.removeAttribute("loading");
    img.removeAttribute("srcset");

    if (src.startsWith("data:")) {
      img.setAttribute("src", src);
    } else if (src.startsWith("blob:")) {
      // Blobs die outside the active tab. Must convert to Base64.
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        img.setAttribute("src", base64);
      } catch (e) {
        console.warn("Failed to convert blob image:", e);
        img.setAttribute("src", src);
      }
    } else {
      // Standard URLs are mapped to absolute paths
      try {
        const absoluteSrc = new URL(src, window.location.origin).href;
        img.setAttribute("src", absoluteSrc);
      } catch (e) {
        img.setAttribute("src", src);
      }
    }
  }
}

// ==========================================
// 3. PARSING LOGIC
// ==========================================
async function parseChatData() {
  const host = window.location.hostname;
  const platformKey = Object.keys(PLATFORMS).find((key) => host.includes(key));
  if (!platformKey) return { blocks: [] };

  const config = PLATFORMS[platformKey];

  const rawTitle = document.title || "Chat Export";
  const chatTitle = rawTitle.replace(/( - ChatGPT| - Claude| - Gemini)$/, "").trim();
  const modelName = config.name;

  const elements = document.querySelectorAll(config.messageNode);
  const chatBlocks = [];

  for (let i = 0; i < elements.length; i++) {
    const node = elements[i];
    const cleanNode = node.cloneNode(true);

    const unwanted = cleanNode.querySelectorAll(
      "button, svg, .copy-code-button, .code-block-decoration, .visually-hidden, .sr-only, [aria-hidden='true']:not(.katex *), .chat-actions, .response-header, .user-query-header",
    );
    unwanted.forEach((el) => {
      if (!el.closest(".katex, .math-inline, .math-block, mjx-container")) el.remove();
    });

    const allTextElements = cleanNode.querySelectorAll("*");
    allTextElements.forEach((el) => {
      if (el.textContent.trim() === "You said" && el.children.length === 0) {
        el.remove();
      }
    });

    preserveMath(cleanNode);
    await processImages(cleanNode, node);

    chatBlocks.push({
      sender: config.isUser(node) ? "User Prompt" : "LLM Response",
      htmlContent: config.getHtml(cleanNode),
    });
  }

  return { chatTitle, modelName, blocks: chatBlocks };
}

// ==========================================
// 4. EXPORT LISTENER
// ==========================================
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  parseChatData().then((chatData) => {
    if (!chatData.blocks.length) {
      alert("No active chat content found on this page.");
      sendResponse({ status: "error" });
      return;
    }

    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const formattedDate = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    // ==========================================
    // EXPORT MARKDOWN
    // ==========================================
    if (request.action === "EXPORT_MD") {
      const turndownService = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
      });

      turndownService.escape = (string) => string;

      turndownService.addRule("mathTags", {
        filter: (node) => {
          if (node.nodeType !== 1) return false;
          return (
            node.hasAttribute("data-raw-tex") ||
            node.classList.contains("math-inline") ||
            node.classList.contains("math-block") ||
            node.classList.contains("katex") ||
            node.tagName.toLowerCase() === "mjx-container"
          );
        },
        replacement: (content, node) => {
          let tex = node.getAttribute("data-raw-tex");

          if (!tex) {
            tex = node.textContent.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
          }

          const isDisplay =
            node.classList?.contains("math-block") ||
            node.classList?.contains("katex-display") ||
            node.getAttribute("display") === "true" ||
            (node.tagName?.toLowerCase() === "mjx-container" && node.getAttribute("display") === "true");

          return isDisplay ? `\n\n$$${tex}$$\n\n` : `$${tex}$`;
        },
      });

      turndownService.addRule("fencedCodeBlockWithLang", {
        filter: (node) => node.nodeName === "PRE",
        replacement: (content, node) => {
          const codeEl = node.querySelector("code") || node;
          const className = codeEl.getAttribute("class") || node.getAttribute("class") || "";
          const langMatch =
            className.match(/language-([a-zA-Z0-9_\-]+)/) || node.getAttribute("data-language") || codeEl.getAttribute("data-language");
          const lang = Array.isArray(langMatch) ? langMatch[1] : langMatch || "";
          const code = codeEl.textContent.replace(/\n$/, "");
          return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
        },
      });

      turndownService.addRule("tables", {
        filter: ["table"],
        replacement: (content, node) => {
          let mdTable = "\n\n";
          const rows = node.querySelectorAll("tr");
          rows.forEach((row, i) => {
            const cells = row.querySelectorAll("th, td");
            let rowText = "| ";
            cells.forEach((cell) => {
              let safeText = cell.textContent.trim().replace(/\n/g, " ").replace(/\|/g, "\\|");
              rowText += safeText + " | ";
            });
            mdTable += rowText + "\n";
            if (i === 0) mdTable += "|" + "---|".repeat(cells.length) + "\n";
          });
          return mdTable + "\n\n";
        },
      });

      let mdOutput = `# ${chatData.chatTitle}\n*Date: ${formattedDate.split(" ")[0]}*\n\n---\n\n`;
      chatData.blocks.forEach((item) => {
        mdOutput += `### **${item.sender}**\n\n${turndownService.turndown(item.htmlContent)}\n\n---\n\n`;
      });
      mdOutput += `\n*Exported with Chat-a-logue*\n`;

      const blob = new Blob([mdOutput], { type: "text/markdown;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `chat-export-${Date.now()}.md`;
      link.click();
      URL.revokeObjectURL(link.href);

      sendResponse({ status: "success" });
    }

    // ==========================================
    // EXPORT PDF
    // ==========================================
    if (request.action === "EXPORT_PDF") {
      let htmlTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="img-src * data: blob:; font-src * data: blob:; default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;">
          <title>${chatData.chatTitle}</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
          <style>
            @page { margin: 0; }
            html, body {
              background-color: #fbf1c7 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              html, body {
                background-color: #fbf1c7 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body { margin: 15mm; }
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #3c3836;
              margin: 15mm;
              padding: 0;
              line-height: 1.6;
            }
            .custom-header {
              display: flex; align-items: center; gap: 15px;
              border-bottom: 2px solid #d5c4a1; padding-bottom: 10px; margin-bottom: 20px;
              color: #928374; font-size: 0.95rem; font-family: monospace; font-weight: bold;
              width: 100%;
            }
            .header-title {
              flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;
            }
            .custom-footer {
              display: flex; justify-content: space-between; align-items: center;
              border-top: 2px solid #d5c4a1; padding-top: 10px; margin-top: 30px;
              color: #928374; font-size: 0.9rem; font-family: monospace; font-weight: bold;
            }
            .message-card {
              margin-bottom: 20px; padding: 18px; border-radius: 8px;
              background-color: #f9f5d7 !important; border: 1px solid #ebdbb2;
              page-break-inside: avoid;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .sender { font-weight: 700; font-size: 1.05rem; margin-bottom: 10px; color: #b57614; }
            pre { background-color: #282828 !important; padding: 14px; overflow-x: auto; white-space: pre-wrap; border-radius: 6px; }
            code { background-color: #282828 !important; color: #ebdbb2; padding: 2px 6px; border-radius: 4px; font-family: 'Fira Code', monospace; font-size: 0.9em; }
            pre code { padding: 0; background-color: transparent !important; }
            .hljs-keyword, .token.keyword, .hljs-built_in, .token.builtin { color: #fb4934 !important; }
            .hljs-string, .token.string { color: #b8bb26 !important; }
            .hljs-number, .token.number { color: #d3869b !important; }
            .hljs-title, .token.function, .token.class-name, .hljs-title.class_ { color: #fabd2f !important; }
            .hljs-comment, .token.comment { color: #928374 !important; font-style: italic !important; }
            .hljs-variable, .token.variable, .hljs-attr, .token.property { color: #83a598 !important; }
            .hljs-type, .token.type { color: #fe8019 !important; }
            .hljs-operator, .token.operator { color: #8ec07c !important; }
            .hljs-punctuation, .token.punctuation { color: #a89984 !important; }
            
            /* Math Rendering Fixes */
            .katex-mathml, mjx-assistive-mml { display: none !important; }
            .katex, .math-inline, .math-block, mjx-container { line-height: normal !important; }
            
            mjx-container { display: inline-block; vertical-align: middle; }
            mjx-container[display="true"] { display: block; text-align: center; margin: 1em 0; }
            mjx-container svg { display: inline-block; max-width: 100%; height: auto; }
            
            /* Table & Image Styling */
            .message-card table { border-collapse: collapse; width: 100%; margin: 14px 0; }
            .message-card th, .message-card td { border: 1px solid #d5c4a1; padding: 8px 12px; text-align: left; }
            .message-card th { background-color: #ebdbb2 !important; color: #3c3836; }
            img { max-width: 100%; height: auto; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="custom-header">
            <span style="white-space: nowrap; margin-right: 15px;">${formattedDate}</span>
            <span class="header-title">${chatData.chatTitle}</span>
          </div>
      `;

      chatData.blocks.forEach((item) => {
        htmlTemplate += `
          <div class="message-card">
            <div class="sender">${item.sender}</div>
            <div class="content">${item.htmlContent}</div>
          </div>
        `;
      });

      htmlTemplate += `
          <div class="custom-footer">
            <span>Exported with Chat-a-logue</span>
            <span>${chatData.modelName}</span>
          </div>
          <script>
            // Ensure remote images and Math fonts fully render before triggering the print menu
            window.onload = function() {
              document.fonts.ready.then(() => {
                setTimeout(() => { window.print(); }, 600);
              });
            };
          </script>
        </body>
        </html>
      `;

      sendResponse({ status: "success", html: htmlTemplate });
    }
  });

  return true;
});
