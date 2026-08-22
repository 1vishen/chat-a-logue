# Markdown Extension Stress Test Suite - Google Gemini
*Date: 22-08-2026*

---

### **User Prompt**

i am testing my chatgpt, gemini, claude to md/pdf extension, can you please generate some example content that can test it?

  

it should test heavily the ability of my extention to get tables, code blocks, latex formulaes mathe etc, images right, and include all other things you think it should get right

  

i need you to so as extreme as possible since i need to test every scenario possible so include as much variety as you can generate (excluding videos, gif of course)

---

### **LLM Response**

This stress test suite covers extreme edge cases across **LaTeX mathematics**, **Markdown tables**, **nested lists**, **code blocks with escaping**, **blockquotes**, **formatted inline text**, and **embedded visuals**.

**1. Inline & Block LaTeX Equations**

Inline formulas test spacing and inline rendering: $e^{i\pi} + 1 = 0$, $\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$, and $\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$.

Multi-line matrix, fraction, and double-integral block test:

$$\iint_{\Omega} \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) dx \, dy = \oint_{\partial \Omega} (P \, dx + Q \, dy)$$

$$\mathbf{J} = \begin{bmatrix} \frac{\partial f_1}{\partial x_1} & \dots & \frac{\partial f_1}{\partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial f_m}{\partial x_1} & \dots & \frac{\partial f_m}{\partial x_n} \end{bmatrix} \cdot \left( \prod_{i=1}^{k} \lambda_i \right)$$

**2. Extreme Markdown Tables**

Tests multiline text, alignment variants, inline math, line breaks (`<br>`), code formatting, and pipes inside cell content.

| Alignment | Feature / Syntax | Mathematical Formula | Escaped Code & Symbols | 
|---|---|---|---|
| Left | Multiline textwith forced line breaks | f(x)=∫−∞x​e−t2dt | pipe: \| symbol | 
| Center | Inline Code & Bold | limx→0​xsinx​=1 | <div>HTML Tag</div> | 
| Right | Plain text string | ATA=In​ | price: $99.99 | 

**3. Complex & Nested Code Blocks**

Tests syntax highlighting, escaped characters, multiline strings, and regex parsing.

```
import re
from typing import List, Dict, Any

class ParserStressTest:
    """Stress test class for parsing markdown and LaTeX content."""
    
    def __init__(self, pattern: str = r"([a-zA-Z0-9]+)\s*\|\s*(\d+)"):
        self.regex = re.compile(pattern)
        
    def execute(self, payload: List[Dict[str, Any]]) -> str:
        # String escaping test: "Quotes", 'Singles', \n, \t, \\ backslashes
        raw_json = "{\"key\": \"value\\nwith\\t escaped items\"}"
        return f"Parsed {len(payload)} items -> {raw_json}"

if __name__ == "__main__":
    test = ParserStressTest()
    print(test.execute([{"test": 1}, {"test": 2}]))
```
```
// Front-end markdown rendering test
const renderMarkdown = (str) => {
  const latexRegex = /\$\$([\s\S]*?)\$\$/g;
  return str.replace(latexRegex, (match, group) => `<div class="math">${group}</div>`);
};
```

**4. Rich Embedded Visuals**

Tests parsing of dynamic image structures, captions, and text boundaries.

**5. Typography, Escaped Characters & Nested Elements**

> **Nested Blockquote Level 1:** Testing blockquote parsing with formatted text.
> 
> > **Nested Blockquote Level 2:** Contains inline math $\sqrt{x^2 + y^2}$ and inline code `npm run build`.

*   **Nested List Level 1**
    
    *   Sub-item with _italics_, **bold**, **_bold-italic_**, and ~~strikethrough~~.
        
    *   Sub-item with inline code: `const x = 42;` and inline equation $a^2 + b^2 = c^2$.
        
        1.  Deeply nested ordered list item 1.
            
        2.  Deeply nested ordered list item 2.
            
*   **Special Characters & Entities:** `&`, `<`, `>`, `"`, `'`, `\`, `/`, `@`, `#`, `$`, `%`, `^`, `*`.

---


*Exported with Chat-a-logue*
