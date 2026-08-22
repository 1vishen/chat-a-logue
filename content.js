// ==========================================
// 1. SELECTOR CONFIGURATION
// ==========================================
var PLATFORMS = {
  "chatgpt.com": {
    name: "ChatGPT",
    // Uses structural data attributes (Highly Resilient)
    messageNode: "[data-message-author-role]",
    isUser: (node) => node.getAttribute("data-message-author-role") === "user",
    getHtml: (node) => node.innerHTML,
  },
  "gemini.google.com": {
    name: "Gemini",
    // Uses custom HTML Web Components (Extremely Resilient)
    messageNode: "user-query, response-container, model-response",
    isUser: (node) => node.tagName.toLowerCase() === "user-query",
    getHtml: (node) => {
      const clone = node.cloneNode(true);
      const mainContent = clone.querySelector(".message-content, .model-response-text, .query-text") || clone;
      return mainContent.innerHTML;
    },
  },
  "claude.ai": {
    name: "Claude",
    // Uses both modern data attributes and legacy class fallbacks
    messageNode: ".font-user-message, [data-testid='user-message'], .font-claude-message, .font-claude-response",
    isUser: (node) => node.classList.contains("font-user-message") || node.getAttribute("data-testid") === "user-message",
    getHtml: (node) => node.innerHTML,
  },
};

// ==========================================
// 2. PRE-PROCESSING HELPERS
// ==========================================
function preserveMath(cloneNode) {
  const mathNodes = cloneNode.querySelectorAll(".math-inline, .math-block, .katex, mjx-container");
  mathNodes.forEach((node) => {
    let tex = "";
    const annotation = node.querySelector("annotation");
    if (annotation) tex = annotation.textContent;

    if (!tex) {
      const mathTag = node.querySelector("math");
      if (mathTag) tex = mathTag.getAttribute("alttext");
    }

    if (!tex) tex = node.getAttribute("data-tex") || node.getAttribute("data-math");

    if (!tex && node.tagName.toLowerCase() === "mjx-container") {
      const mjxMath = node.querySelector("mjx-math");
      if (mjxMath) tex = mjxMath.getAttribute("aria-label");
    }

    if (tex) {
      tex = tex.replace(/^ParseError:\s*KaTeX\s*parse\s*error:\s*[^:]+:\s*/i, "");
      tex = tex.replace(/^\$+/, "").replace(/\$+$/, "").trim();
      node.setAttribute("data-raw-tex", tex);
    }
  });
}

async function processImages(cloneNode, originalNode) {
  const cloneImages = cloneNode.querySelectorAll("img");
  const originalImages = originalNode.querySelectorAll("img");

  for (let i = 0; i < cloneImages.length; i++) {
    const img = cloneImages[i];
    if (img.closest(".katex, mjx-container, .math-inline, .math-block")) continue;

    const origImg = originalImages[i];
    if (!origImg) continue;

    let src = origImg.currentSrc || origImg.src || origImg.getAttribute("src") || origImg.getAttribute("data-src");
    if (!src) continue;

    img.removeAttribute("loading");
    img.removeAttribute("srcset");

    if (src.startsWith("data:")) {
      img.setAttribute("src", src);
    } else if (src.startsWith("blob:")) {
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
      try {
        const absoluteSrc = new URL(src, window.location.origin).href;
        img.setAttribute("src", absoluteSrc);
      } catch (e) {
        img.setAttribute("src", src);
      }
    }
  }
}

// Uses bundled Highlight.js to colorize code BEFORE generating the PDF
function normalizeCodeBlocks(cloneNode) {
  const preBlocks = cloneNode.querySelectorAll("pre");
  preBlocks.forEach((pre) => {
    const code = pre.querySelector("code") || pre;
    const rawCode = code.textContent;
    let lang = "";
    const className = (code.className || "") + " " + (pre.className || "");
    const langMatch = className.match(/language-([a-zA-Z0-9_\-]+)/);
    if (langMatch) lang = langMatch[1];

    if (typeof hljs !== "undefined") {
      try {
        code.innerHTML = lang && hljs.getLanguage(lang) ? hljs.highlight(rawCode, { language: lang }).value : hljs.highlightAuto(rawCode).value;
        code.classList.add("hljs");
      } catch (e) {
        code.textContent = rawCode;
      }
    } else {
      code.textContent = rawCode;
    }
  });
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
    normalizeCodeBlocks(cleanNode);
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

    // EXPORT MARKDOWN
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
          if (!tex) tex = node.textContent.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

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

    // EXPORT PDF
    if (request.action === "EXPORT_PDF") {
      let themeStyles = "";
      let hljsStyles = "";

      if (request.theme === "dark") {
        themeStyles = `
          --bg: #1e1e1e; --text: #d4d4d4; --header-border: #3c3836;
          --header-text: #83a598; --card-bg: #282828; --card-border: #3c3836;
          --sender: #83a598; --table-header: #3c3836; --table-border: #504945;
          --code-bg: #0d1117; --code-text: #e6edf3;
        `;
        hljsStyles = `
          .hljs { color: #c9d1d9; background: #0d1117; }
          .hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_ { color: #ff7b72; }
          .hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_ { color: #d2a8ff; }
          .hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-variable, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id { color: #79c0ff; }
          .hljs-regexp, .hljs-string, .hljs-meta .hljs-string { color: #a5d6ff; }
          .hljs-built_in, .hljs-symbol { color: #ffa657; }
          .hljs-comment, .hljs-code, .hljs-formula { color: #8b949e; }
        `;
      } else if (request.theme === "light") {
        themeStyles = `
          --bg: #ffffff; --text: #24292f; --header-border: #d0d7de;
          --header-text: #57606a; --card-bg: #f6f8fa; --card-border: #d0d7de;
          --sender: #0969da; --table-header: #eaeef2; --table-border: #d0d7de;
          --code-bg: #eaeef2; --code-text: #24292f;
        `;
        hljsStyles = `
          .hljs { color: #24292e; background: #ffffff; }
          .hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_ { color: #d73a49; }
          .hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_ { color: #6f42c1; }
          .hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-variable, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id { color: #005cc5; }
          .hljs-regexp, .hljs-string, .hljs-meta .hljs-string { color: #032f62; }
          .hljs-built_in, .hljs-symbol { color: #e36209; }
          .hljs-comment, .hljs-code, .hljs-formula { color: #6a737d; }
        `;
      } else {
        themeStyles = `
          --bg: #fbf1c7; --text: #3c3836; --header-border: #d5c4a1;
          --header-text: #928374; --card-bg: #f9f5d7; --card-border: #ebdbb2;
          --sender: #b57614; --table-header: #ebdbb2; --table-border: #d5c4a1;
          --code-bg: #282828; --code-text: #ebdbb2;
        `;
        hljsStyles = `
          .hljs { color: #ebdbb2; background: #282828; }
          .hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_ { color: #fb4934; }
          .hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_ { color: #fabd2f; }
          .hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-variable, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id { color: #d3869b; }
          .hljs-regexp, .hljs-string, .hljs-meta .hljs-string { color: #b8bb26; }
          .hljs-built_in, .hljs-symbol { color: #fe8019; }
          .hljs-comment, .hljs-code, .hljs-formula { color: #928374; font-style: italic; }
        `;
      }

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
            :root {
              ${themeStyles}
            }
            ${hljsStyles} /* Embedded Syntax Palette */
            
            @page { margin: 0; }
            html, body {
              background-color: var(--bg) !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @media print {
              html, body {
                background-color: var(--bg) !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body { margin: 15mm; }
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: var(--text);
              margin: 15mm;
              padding: 0;
              line-height: 1.6;
            }
            .custom-header {
              display: flex; align-items: center; gap: 15px;
              border-bottom: 2px solid var(--header-border); padding-bottom: 10px; margin-bottom: 20px;
              color: var(--header-text); font-size: 0.95rem; font-family: monospace; font-weight: bold;
              width: 100%;
            }
            .header-title {
              flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;
            }
            .custom-footer {
              display: flex; justify-content: space-between; align-items: center;
              border-top: 2px solid var(--header-border); padding-top: 10px; margin-top: 30px;
              color: var(--header-text); font-size: 0.9rem; font-family: monospace; font-weight: bold;
            }
            .message-card {
              margin-bottom: 20px; padding: 18px; border-radius: 8px;
              background-color: var(--card-bg) !important; border: 1px solid var(--card-border);
              page-break-inside: avoid;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .sender { font-weight: 700; font-size: 1.05rem; margin-bottom: 10px; color: var(--sender); }
            
            /* Code Block Styling */
            pre { 
              background-color: var(--code-bg) !important; 
              color: var(--code-text) !important;
              padding: 14px; 
              overflow-x: auto; 
              white-space: pre-wrap; 
              border-radius: 6px; 
              font-size: 0.9em;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* FORCES THE DEFAULT CODE TEXT COLOR AND PUNCTUATION TO STAY BRIGHT */
            code { 
              font-family: 'Fira Code', 'Courier New', monospace;
              color: var(--code-text) !important; 
            }
            .hljs-punctuation, .hljs-property {
              color: var(--code-text) !important;
            }
            
            /* Math Rendering Fixes */
            .katex-mathml, mjx-assistive-mml { display: none !important; }
            .katex, .math-inline, .math-block, mjx-container { line-height: normal !important; }
            mjx-container { display: inline-block; vertical-align: middle; }
            mjx-container[display="true"] { display: block; text-align: center; margin: 1em 0; }
            mjx-container svg { display: inline-block; max-width: 100%; height: auto; }
            
            /* Table & Image Styling */
            .message-card table { border-collapse: collapse; width: 100%; margin: 14px 0; }
            .message-card th, .message-card td { border: 1px solid var(--table-border); padding: 8px 12px; text-align: left; }
            .message-card th { background-color: var(--table-header) !important; color: var(--text); }
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
