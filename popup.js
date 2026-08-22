const handleExport = async (actionType, buttonId) => {
  const button = document.getElementById(buttonId);
  const textSpan = button.querySelector(".btn-text");
  const originalText = textSpan.innerText;

  // 1. Trigger Loading State
  button.classList.add("loading");
  button.disabled = true;
  textSpan.innerText = "Processing...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // 2. Fetch value from the new Radio Button swatches
  const selectedTheme = document.querySelector('input[name="theme"]:checked').value;

  try {
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: actionType,
      theme: selectedTheme,
    });

    if (actionType === "EXPORT_PDF" && response && response.html) {
      const blob = new Blob([response.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      chrome.tabs.create({ url: url });
    }

    // 3. Trigger Success State
    textSpan.innerText = "Success!";
  } catch (error) {
    try {
      // Re-inject scripts on the fly if connection to content script was lost
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["turndown.js", "highlight.min.js", "content.js"],
      });

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: actionType,
        theme: selectedTheme,
      });

      if (actionType === "EXPORT_PDF" && response && response.html) {
        const blob = new Blob([response.html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        chrome.tabs.create({ url: url });
      }

      textSpan.innerText = "Success!";
    } catch (injectionError) {
      alert("Chat-a-logue only works on active ChatGPT, Claude, or Gemini tabs! Please reload the page if this persists.");
      textSpan.innerText = "Error";
    }
  } finally {
    // 4. Reset Button after 2 seconds
    setTimeout(() => {
      button.classList.remove("loading");
      button.disabled = false;
      textSpan.innerText = originalText;
    }, 2000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("export-md").addEventListener("click", () => {
    handleExport("EXPORT_MD", "export-md");
  });

  document.getElementById("export-pdf").addEventListener("click", () => {
    handleExport("EXPORT_PDF", "export-pdf");
  });
});
