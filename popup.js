const handleExport = async (actionType) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const selectedTheme = document.getElementById("theme-selector").value;

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
    } catch (injectionError) {
      alert("Chat-a-logue only works on active ChatGPT, Claude, or Gemini tabs! Please reload the page if this persists.");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("export-md").addEventListener("click", () => {
    handleExport("EXPORT_MD");
  });

  document.getElementById("export-pdf").addEventListener("click", () => {
    handleExport("EXPORT_PDF");
  });
});
