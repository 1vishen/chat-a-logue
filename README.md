# 📜 Chat-a-logue 📜

> 📝 Markdown exports
> 📄 Styled PDF exports
> 🧮 LaTeX & MathML preservation
> 💻 Syntax highlighting
> 🖼️ Embedded images
> 🎨 Light / Dark / Gruvbox themes
> 🔒 Local processing
> 🤖 ChatGPT + Claude + Gemini

Got tired of limited exports on other free extensions so built one to export ChatGPT, Claude, and Gemini chats to beautifully formatted Markdown or styled PDFs. Fully Offline.

I build this mainly for exporting my chats with heavy **LaTeX**, **mathematics**, **code**, and **diagrams**. Gruvbox-themed PDFs are my personal favorite, but Light and Dark themes are also available.

## ✨ Features

- **🔒 Privacy First:** Your conversations are processed locally in your browser. No chat content is sent to an external server.
- **Multi AI Support:** Export chats from ChatGPT, Claude, and Google Gemini.
- **Resilient DOM Scraping:** Uses custom web components and data attributes rather than relying heavily on fragile CSS classes, making the exporter more resilient to UI updates.
- **Flawless Math & Code:** Extracts raw LaTeX from MathML/MathJax to preserve mathematical notation during export, and uses a locally bundled Highlight.js engine for completely offline code highlighting.
- **Base64 Image Conversion:** Automatically fetches and converts blob images to Base64 so exported PDFs and Markdown files retain their visuals.
- **Context Loss Prevention:** Automatically reinjects content scripts on the fly if the browser context invalidates, meaning you never have to manually refresh your tab.
- **Dynamic Theming:** Export your chats in Light, Dark, or Gruvbox themed PDF or Markdown files.

## 📸 See It In Action

Check out the screenshots below to see how Chat-a-logue handles complex layouts, math, ASCII diagrams, and syntax highlighting:

### 1. Layout

![Layout Example](examples/images/ex1.png)

### 2. Math

![Math Equations](examples/images/ex2.png)

### 3. ASCII

![ASCII Flowcharts](examples/images/ex3.png)

### 4. Syntax Highlighting

![Syntax Highlighting](examples/images/ex4.png)

### 📄 View Full Export Examples

Want to see exactly what the final output looks like? [Click here to view detailed PDF and Markdown export samples](examples).

## 🚀 Installation & Local Setup

Load it directly into any Chromium-based browser (Chrome, Brave, Edge, Arc etc.) using Developer Mode:
_Firefox is not currently supported._

1. **Clone or Download the Repository**
   - Clone via terminal:
     `git clone https://github.com/1vishen/chat-a-logue.git`
   - Or download the ZIP from GitHub and unzip the folder.

2. **Open Extensions Management**
   - Chrome / Brave / Arc: Go to `chrome://extensions/`
   - Edge: Go to `edge://extensions/`

3. **Enable Developer Mode**
   - Turn on the **Developer mode** toggle in the top-right corner.

4. **Load the Unpacked Folder**
   - Click **Load unpacked** in the top-left corner.
   - Select the root `chat-a-logue` folder (where `manifest.json` is located).

5. **Pin & Run**
   - Pin Chat-a-logue to your toolbar.
   - Open any chat on ChatGPT, Claude, or Google Gemini and start exporting!

# ⚠️ Compatibility

Chat-a-logue currently supports Chromium-based browsers and is designed to work with the current web interfaces of ChatGPT, Claude, and Google Gemini.

Because these platforms frequently change their frontend implementations, occasional compatibility issues may occur. If an export breaks after a platform update, please open an issue with an example.

---

Icons are from ![flowbite](https://flowbite.com/icons/).
