const handleExport = async (actionType) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  try {
    const response = await chrome.tabs.sendMessage(tab.id, { action: actionType });

    // Handle PDF opening from the popup's context to bypass blockers
    if (actionType === "EXPORT_PDF" && response && response.html) {
      const blob = new Blob([response.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      chrome.tabs.create({ url: url });
    }
  } catch (error) {
    alert("Chat-a-logue only works on active ChatGPT, Claude, or Gemini tabs!");
  }
};

// Add the event listeners to connect the HTML buttons to the function
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("export-md").addEventListener("click", () => {
    handleExport("EXPORT_MD");
  });

  document.getElementById("export-pdf").addEventListener("click", () => {
    handleExport("EXPORT_PDF");
  });
});
