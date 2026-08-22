# Generate Test Content
*Date: 22-08-2026*

---

### **User Prompt**

i am testing my chatgpt, gemini, claude to md/pdf extension, can you please generate some example content that can test it? it should test heavily the ability of my extention to get tables, code blocks, latex formulaes mathe etc, images right, and include all other things you think it should get right i need you to so as extreme as possible since i need to test every scenario possible so include as much variety as you can generate (excluding videos, gif of course)

---

### **LLM Response**

Absolutely. For testing a **ChatGPT/Gemini/Claude → Markdown/PDF extension**, I’d make the fixture deliberately nasty: ordinary Markdown plus edge cases that tend to expose parsing, rendering, pagination, escaping, syntax-highlighting, LaTeX, table, image, Unicode, HTML, and PDF-layout bugs.

Below is a **single extreme Markdown test corpus**. You can copy the entire code block into your extension and compare the generated `.md` and `.pdf` outputs.

```
# EXTREME MARKDOWN → PDF TEST SUITE

> **Purpose:** Stress-test Markdown extraction, Markdown rendering, PDF generation, typography, tables, code blocks, mathematics, images, links, HTML, Unicode, pagination, escaping, and edge cases.
>
> **Expected result:** Nothing should disappear, overlap, get truncated, unexpectedly reflow, or lose semantic structure.

---

# 1. Basic Formatting

This paragraph contains **bold text**, *italic text*, ***bold italic text***, ~~strikethrough text~~, `inline code`, and [a normal hyperlink](https://example.com).

Here is a word with **nested *emphasis*** and *nested **strong emphasis***.

Here is `code containing **asterisks** and _underscores_`.

Escaping test:

\*not italic\*

\*\*not bold\*\*

\`not inline code\`

\# not a heading

Backslash:

\\

Pipe:

\|

Angle brackets:

\<hello\>

Ampersand:

&amp;

Greater-than:

\>

---

# 2. Heading Hierarchy

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

---

# 3. Paragraph Wrapping Test

This is an intentionally long paragraph designed to test line wrapping, word spacing, justification, page boundaries, and the behavior of long continuous text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vulputate, ligula at malesuada malesuada, neque arcu pellentesque purus, vitae fermentum neque justo at turpis. Integer faucibus, mauris sed tincidunt pellentesque, augue ipsum sollicitudin massa, vitae gravida purus ligula sed ipsum. Donec consectetur, lorem non tincidunt consequat, turpis lectus feugiat massa, sed volutpat risus lectus nec libero.

A second paragraph immediately follows without any special formatting.

A third paragraph contains a verylongunbrokenwordthatshouldtestwhetherthePDFrendererproperlyhandleslongunbreakablecontentwithoutoverflowingthepage.

---

# 4. Lists

## Unordered List

- Apple
- Banana
- Cherry
- Dragon fruit
- Elderberry

## Nested Unordered List

- Level 1
  - Level 2
    - Level 3
      - Level 4
        - Level 5
- Another Level 1

## Ordered List

1. First item
2. Second item
3. Third item
4. Fourth item

## Ordered List Starting at 42

42. Answer
43. Another answer
44. Yet another answer

## Mixed Lists

1. First
   - Nested unordered item
   - Another nested item
     1. Deep ordered item
     2. Deep ordered item
2. Second
   - Nested item

## Task List

- [x] Markdown parser
- [x] Code block extraction
- [x] Table rendering
- [ ] PDF pagination
- [ ] Image handling
- [ ] Mathematical formulas
- [ ] Unicode stress testing

---

# 5. Blockquotes

> This is a normal blockquote.

> **Bold inside a blockquote**
>
> *Italic inside a blockquote*
>
> `Code inside a blockquote`

## Nested Blockquotes

> Level 1
>
> > Level 2
> >
> > > Level 3
> > >
> > > **Deeply nested quote**

---

# 6. Horizontal Rules

---

***

___

---

# 7. Links

Normal link:

[Open Example](https://example.com)

Link with title:

[Example Website](https://example.com "Example Website")

Autolink:

<https://example.com>

Email-style autolink:

<test@example.com>

Plain URL:

https://example.com

Link containing punctuation:

[Search](https://example.com/search?q=hello%20world&sort=desc)

---

# 8. Footnotes

Here is a sentence with a footnote.[^1]

Here is another sentence with a second footnote.[^2]

Here is a repeated reference.[^1]

[^1]: This is the first footnote.

[^2]: This is the second footnote containing **bold**, *italic*, and `code`.

---

# 9. Simple Table

| Name | Age | City |
|---|---:|---|
| Alice | 24 | Mumbai |
| Bob | 31 | Delhi |
| Charlie | 28 | Pune |
| Diana | 35 | Bengaluru |

---

# 10. Table Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:---|:---:|---:|
| Apple | Banana | ₹100 |
| Orange | Mango | ₹250 |
| Grapes | Pineapple | ₹999 |
| Watermelon | Strawberry | ₹1,250 |

---

# 11. Wide Table

| ID | First Name | Last Name | Email | Department | Position | Location | Salary | Status | Joining Date |
|---:|---|---|---|---|---|---|---:|---|---|
| 10001 | Alice | Anderson | alice@example.com | Engineering | Software Engineer | Mumbai | ₹1,250,000 | Active | 2024-01-15 |
| 10002 | Bob | Brown | bob@example.com | Finance | Analyst | Delhi | ₹980,000 | Active | 2023-07-20 |
| 10003 | Charlie | Clark | charlie@example.com | Engineering | Senior Engineer | Pune | ₹1,850,000 | Active | 2021-04-11 |
| 10004 | Diana | Davis | diana@example.com | HR | Manager | Bengaluru | ₹1,450,000 | Leave | 2020-12-01 |
| 10005 | Edward | Evans | edward@example.com | Operations | Director | Hyderabad | ₹2,350,000 | Active | 2019-09-17 |

**PDF test:** This table should not be clipped horizontally. The renderer should either wrap cells, resize columns, or intelligently handle the table.

---

# 12. Table With Long Text

| Component | Description | Failure Scenario | Expected Behavior |
|---|---|---|---|
| Authentication Service | Responsible for validating credentials and issuing access tokens | Database unavailable | Return an appropriate error without exposing internal details |
| Payment Service | Processes payment requests and communicates with external payment providers | Provider timeout | Retry according to policy and prevent duplicate transactions |
| Notification Service | Sends email, SMS, and push notifications | Message queue unavailable | Persist the event or retry later |
| Reporting Service | Generates reports from historical transactional data | Large dataset | Stream or paginate results rather than loading everything into memory |

---

# 13. Table With Markdown

| Feature | Supported | Notes |
|---|:---:|---|
| **Bold** | ✅ | Works |
| *Italic* | ✅ | Works |
| `Code` | ✅ | Works |
| [Links](https://example.com) | ✅ | Works |
| ~~Strike~~ | ✅ | Works |
| $x^2$ | ✅ | Mathematical content |
| <tag> | ⚠️ | HTML ambiguity |

---

# 14. Code — Java

```java
import java.util.*;

public class BinarySearchExample {

    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) {
                return mid;
            }

            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] numbers = {1, 3, 5, 7, 9, 11, 13};

        int index = binarySearch(numbers, 9);

        System.out.println("Index = " + index);
    }
}
```

* * *

# 15. Code — Python

```
def fibonacci(n: int) -> int:
    if n <= 1:
        return n

    a, b = 0, 1

    for _ in range(2, n + 1):
        a, b = b, a + b

    return b


if __name__ == "__main__":
    for i in range(10):
        print(i, fibonacci(i))
```

* * *

# 16. Code — JavaScript

```
async function fetchUsers() {
    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    return users
        .filter(user => user.active)
        .map(user => ({
            id: user.id,
            name: user.name
        }));
}

fetchUsers()
    .then(console.log)
    .catch(console.error);
```

* * *

# 17. Code — TypeScript

```
interface User {
    id: number;
    name: string;
    email?: string;
    roles: string[];
}

function getDisplayName(user: User): string {
    return user.name.trim() || "Unknown User";
}

const user: User = {
    id: 42,
    name: "Alice",
    roles: ["admin", "developer"]
};

console.log(getDisplayName(user));
```

* * *

# 18. Code — SQL

```
WITH ranked_users AS (
    SELECT
        user_id,
        name,
        department,
        salary,
        RANK() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS salary_rank
    FROM employees
)
SELECT
    user_id,
    name,
    department,
    salary
FROM ranked_users
WHERE salary_rank <= 3
ORDER BY department, salary DESC;
```

* * *

# 19. Code — JSON

```
{
  "name": "Example Application",
  "version": "1.0.0",
  "enabled": true,
  "features": [
    "markdown",
    "pdf",
    "latex",
    "tables"
  ],
  "metadata": {
    "author": "Test User",
    "license": "MIT"
  },
  "limits": {
    "maxFileSize": null,
    "retryCount": 3
  }
}
```

* * *

# 20. Code — XML

```
<?xml version="1.0" encoding="UTF-8"?>
<application>
    <name>Payment Gateway</name>
    <environment>production</environment>
    <enabled>true</enabled>

    <database>
        <host>db.example.com</host>
        <port>5432</port>
        <ssl>true</ssl>
    </database>
</application>
```

* * *

# 21. Code — YAML

```
application:
  name: payment-service
  version: 2.4.1
  environment: production

server:
  port: 8080
  compression: true

database:
  host: localhost
  port: 5432
  username: app_user
  password: ${DB_PASSWORD}

features:
  - authentication
  - payments
  - reporting
```

* * *

# 22. Code — Bash

```
#!/usr/bin/env bash

set -euo pipefail

echo "Starting deployment..."

git fetch origin
git checkout main
git pull --rebase origin main

npm ci
npm test
npm run build

echo "Deployment completed."
```

* * *

# 23. Code — CSS

```
.container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding: 2rem;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
```

* * *

# 24. Code — HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Markdown Test</title>
</head>
<body>
    <main>
        <h1>Hello World</h1>
        <p>This is an HTML test.</p>
    </main>
</body>
</html>
```

* * *

# 25. Code — C++

```
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> values{5, 2, 9, 1, 7};

    std::sort(values.begin(), values.end());

    for (const auto value : values) {
        std::cout << value << ' ';
    }

    return 0;
}
```

* * *

# 26. Code — COBOL

```
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-WORLD.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-MESSAGE PIC X(30)
           VALUE 'HELLO FROM COBOL'.

       PROCEDURE DIVISION.
           DISPLAY WS-MESSAGE.
           STOP RUN.
```

* * *

# 27. Code With Special Characters

```
< > <= >= != == === !==
&& || ! ++ -- += -= *= /=
"double quotes"
'single quotes'
`backticks`
${variable}
${{nested: "braces"}}
[brackets]
{braces}
(parentheses)
```

* * *

# 28. Inline Code Stress Test

Use `SELECT * FROM users;` inside a sentence.

Use `` `code containing a backtick: ` `` inside a sentence.

Use `C:\Users\Test\Documents\file.txt`.

Use `/usr/local/bin/example`.

Use `https://example.com/api/v1/users?id=123`.

* * *

# 29. Mathematics — Inline

The quadratic equation is

$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

Einstein's famous equation is $E = mc^2$.

The Pythagorean theorem is $a^2 + b^2 = c^2$.

The probability of an event is

$P(A) = \frac{|A|}{|\Omega|}$.

* * *

# 30. Mathematics — Display Equations

$E=mc2$ $a2+b2=c2$ $∫01x2dx=31$ $i=1∑ni=2n(n+1)$

* * *

# 31. Quadratic Formula

$x=2a−b±b2−4ac$

* * *

# 32. Calculus

$dxd(xn)=nxn−1$ $∫xndx=n+1xn+1+C$ $x→0limxsinx=1$

* * *

# 33. Matrix

$A=147258369$

* * *

# 34. Determinant

$det(A)=acbd=ad−bc$

* * *

# 35. Cases

$f(x)={x2,−x,x≥0x<0$

* * *

# 36. Aligned Equations

$a=b+c=d+e=f+g$

* * *

# 37. Maxwell's Equations

$∇⋅E=ε0ρ$ $∇⋅B=0$ $∇×E=−∂t∂B$ $∇×B=μ0J+μ0ε0∂t∂E$

* * *

# 38. Probability

$P(A∣B)=P(B)P(B∣A)P(A)$

This is Bayes' theorem.

* * *

# 39. Statistics

$μ=n1i=1∑nxi$ $σ2=n1i=1∑n(xi−μ)2$ $σ=σ2$

* * *

# 40. Complex Mathematical Expression

$β^=(XTX)−1XTy$ $L(θ)=−N1i=1∑N[yilog(y^i)+(1−yi)log(1−y^i)]$ $softmax(zi)=∑j=1Kezjezi$

* * *

# 41. Greek Letters

$\alpha$

$\beta$

$\gamma$

$\delta$

$\epsilon$

$\theta$

$\lambda$

$\mu$

$\pi$

$\sigma$

$\phi$

$\omega$

$\Delta$

$\Sigma$

$\Omega$

* * *

# 42. Math With Text

$Average=Number of valuesSum of values$ $O(nlogn)$ $three termsa+b+c$

* * *

# 43. Code + Mathematics

The time complexity of binary search is

$T(n)=T(2n)+O(1)$

which gives

$T(n)=O(logn).$

```
int left = 0;
int right = arr.length - 1;

while (left <= right) {
    int mid = left + (right - left) / 2;

    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}
```

* * *

# 44. Image Test — Normal Image

* * *

# 45. Image Test — Different Aspect Ratio

* * *

# 46. Image With Title

* * *

# 47. Multiple Images

* * *

# 48. Broken Image Test

The PDF generator should handle broken images gracefully rather than crashing.

* * *

# 49. Image Beside Text Concept

The text immediately following an image should remain readable and should not overlap the image.

* * *

# 50. HTML Image

<img src="https://placehold.co/500x300/png?text=HTML+Image" alt="HTML image test">

* * *

# 51. HTML Formatting

<div> <strong>Bold HTML</strong> <em>Italic HTML</em> <code>Inline HTML code</code> </div> <p>This is an HTML paragraph.</p> <hr>

* * *

# 52. HTML Table

<table> <thead> <tr> <th>Name</th> <th>Score</th> </tr> </thead> <tbody> <tr> <td>Alice</td> <td>95</td> </tr> <tr> <td>Bob</td> <td>87</td> </tr> </tbody> </table>

* * *

# 53. Definition List

Term A  
: Definition for term A.

Term B  
: Definition for term B.

Term C  
: A longer definition that should wrap properly across lines and potentially across a page boundary.

* * *

# 54. Unicode Stress Test

English: Hello World

Hindi: नमस्ते दुनिया

Marathi: नमस्कार जग

Sanskrit: सर्वे भवन्तु सुखिनः

Bengali: হ্যালো ওয়ার্ল্ড

Tamil: வணக்கம் உலகம்

Telugu: హలో వరల్డ్

Kannada: ಹಲೋ ವರ್ಲ್ಡ್

Malayalam: ഹലോ വേൾഡ്

Gujarati: હેલો વર્લ્ડ

Punjabi: ਹੈਲੋ ਵਰਲਡ

Urdu: ہیلو دنیا

Arabic: مرحباً بالعالم

Hebrew: שלום עולם

Russian: Привет, мир

Greek: Γειά σου Κόσμε

Japanese: こんにちは世界

Chinese: 你好世界

Korean: 안녕하세요 세계

Thai: สวัสดีชาวโลก

Vietnamese: Xin chào thế giới

* * *

# 55. Emoji Stress Test

😀 😃 😄 😁 😆 😅 😂 🤣

🚀 🌍 🌎 🌏 ⭐ 🌟 ✨ 🔥

✅ ❌ ⚠️ ❗ ❓ ℹ️

💻 🖥️ 📱 ⌨️ 🖱️

❤️ 💙 💚 💛 💜 🖤 🤍

👨‍💻 👩‍💻 🧑‍🔬 🧑‍🚀

* * *

# 56. Currency Symbols

USD: $100.00

EUR: €99.99

GBP: £75.50

INR: ₹12,345.67

JPY: ¥10,000

KRW: ₩50,000

RUB: ₽5,000

TRY: ₺1,500

Bitcoin: ₿0.001

* * *

# 57. Mathematical Unicode

∞ ≈ ≠ ≤ ≥ ± × ÷ √ ∑ ∏ ∫ ∂ ∇

→ ← ↑ ↓ ↔ ⇒ ⇐ ⇑ ⇓

∈ ∉ ⊂ ⊃ ⊆ ⊇ ∩ ∪

∀ ∃ ∄ ∴ ∵

* * *

# 58. Fractions and Superscripts

½ ⅓ ¼ ¾ ⅞

x²

x³

H₂O

CO₂

10⁹

* * *

# 59. Quotes and Typography

"Straight quotes"

'Single quotes'

“Curly double quotes”

‘Curly single quotes’

«French quotes»

‹Single French quotes›

— em dash

– en dash

… ellipsis

Non-breaking-looking text: foo bar

* * *

# 60. Special Characters

! @ # $ % ^ & * ( ) _ + =

[ ] { } | \ / < > ?

~ `

* * *

# 61. Extremely Long Inline Code

`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`

* * *

# 62. Extremely Long URL

https://example.com/very/long/path/that/should/test/how/the/pdf/renderer/handles/long/urls/without/breaking/the/page/layout/or/overflowing/the/right/margin?parameter1=abcdefghijklmnopqrstuvwxyz&parameter2=1234567890&parameter3=this-is-a-long-value

* * *

# 63. Nested Formatting

_**Bold italic**_

**Bold with _italic inside_**

_Italic with **bold inside**_

Strikethrough with **bold** inside

**Bold with `code` inside**

_Italic with `code` inside_

> **Bold quote with _italic_ and `code`**

* * *

# 64. Markdown Escaping

*literal asterisks*

_literal underscores_

# literal hash

$literalbrackets$

$literalparentheses$

> literal greater-than

| literal pipe

* * *

# 65. Empty and Whitespace Tests

Paragraph after multiple blank lines.

Paragraph with trailing spaces.  
This line intentionally uses Markdown line-break syntax.

Another paragraph.

* * *

# 66. Page Break Stress Test

The following section intentionally contains a lot of text to force PDF pagination.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum interdum, nisl sit amet tincidunt tincidunt, massa ipsum facilisis ipsum, sed tincidunt magna neque sed lorem.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, lectus nec facilisis consectetur, turpis mauris aliquet sapien, vitae tincidunt lorem lorem vitae sapien.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tristique tincidunt risus, non consectetur libero sagittis at.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec massa id justo tincidunt posuere. Donec suscipit metus at neque malesuada, a faucibus augue tincidunt.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Suspendisse potenti. Cras vitae augue vitae neque faucibus consectetur.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat massa at diam posuere, vitae aliquet sapien faucibus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula magna vel turpis dignissim, eget consequat ipsum fermentum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

* * *

# 67. Code Block Pagination Test

```
LINE 001: This is a long code block designed to cross PDF pages.
LINE 002: The renderer should not lose lines.
LINE 003: The renderer should preserve monospace formatting.
LINE 004: The renderer should avoid clipping.
LINE 005: The renderer should repeat table-like boundaries if applicable.
LINE 006: Long code blocks should be allowed to flow naturally.
LINE 007: Line seven.
LINE 008: Line eight.
LINE 009: Line nine.
LINE 010: Line ten.
LINE 011: Line eleven.
LINE 012: Line twelve.
LINE 013: Line thirteen.
LINE 014: Line fourteen.
LINE 015: Line fifteen.
LINE 016: Line sixteen.
LINE 017: Line seventeen.
LINE 018: Line eighteen.
LINE 019: Line nineteen.
LINE 020: Line twenty.
LINE 021: Line twenty-one.
LINE 022: Line twenty-two.
LINE 023: Line twenty-three.
LINE 024: Line twenty-four.
LINE 025: Line twenty-five.
LINE 026: Line twenty-six.
LINE 027: Line twenty-seven.
LINE 028: Line twenty-eight.
LINE 029: Line twenty-nine.
LINE 030: Line thirty.
LINE 031: Line thirty-one.
LINE 032: Line thirty-two.
LINE 033: Line thirty-three.
LINE 034: Line thirty-four.
LINE 035: Line thirty-five.
LINE 036: Line thirty-six.
LINE 037: Line thirty-seven.
LINE 038: Line thirty-eight.
LINE 039: Line thirty-nine.
LINE 040: Line forty.
```

* * *

# 68. Very Wide Code

```
THIS_IS_A_VERY_LONG_VARIABLE_NAME_THAT_IS_INTENTIONALLY_LONG_TO_TEST_HORIZONTAL_OVERFLOW_AND_WORD_BREAKING_BEHAVIOR = "This is an intentionally very long string that should test whether the renderer wraps long lines correctly without destroying the code block formatting.";
```

* * *

# 69. ASCII Diagram

```
                    +-------------------+
                    |      CLIENT       |
                    +---------+---------+
                              |
                              v
                    +-------------------+
                    |    API GATEWAY    |
                    +---------+---------+
                              |
              +---------------+---------------+
              |               |               |
              v               v               v
       +-------------+ +-------------+ +-------------+
       |   USERS     | |   ORDERS    | |  PAYMENTS   |
       |   SERVICE   | |   SERVICE   | |   SERVICE   |
       +------+------+ +------+------+ +------+------+
              |               |               |
              +---------------+---------------+
                              |
                              v
                    +-------------------+
                    |     DATABASE      |
                    +-------------------+
```

* * *

# 70. Mermaid-Like Diagram Test

```
Mermaid
```

The renderer may either render this diagram or preserve it as a code block depending on supported Markdown features.

* * *

# 71. Blockquote + Table

> ## Important Results
> 
> | Metric | Value | 
> |---|---|
> | Users | 125,430 | 
> | Revenue | ₹12,450,000 | 
> | Conversion | 4.82% | 
> | Errors | 0.13% | 

* * *

# 72. List + Code

1.  Install dependencies:
    
    ```
    npm install
    ```
    
2.  Run tests:
    
    ```
    npm test
    ```
    
3.  Build:
    
    ```
    npm run build
    ```
    
4.  Start:
    
    ```
    npm start
    ```
    

* * *

# 73. List + Mathematics

1.  Define the function:
    
    $f(x)=x^2$
    
2.  Differentiate:
    
    $f′(x)=2x$
    
3.  Evaluate at $x=5$:
    
    $f′(5)=10$
    

* * *

# 74. Table + Mathematics

| Concept | Formula | Complexity | 
|---|---|---|
| Arithmetic Series | $\frac{n(n+1)}{2}$ | $O(1)$ | 
| Binary Search | $T(n)=T(n/2)+O(1)$ | $O(\log n)$ | 
| Merge Sort | $T(n)=2T(n/2)+O(n)$ | $O(n\log n)$ | 
| Linear Search | $T(n)=T(n-1)+O(1)$ | $O(n)$ | 

* * *

# 75. Programming Complexity Table

| Algorithm | Best | Average | Worst | Space | 
|---|---|---|---|---|
| Linear Search | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ | 
| Binary Search | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ | 
| Merge Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(n)$ | 
| Quick Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n^2)$ | $O(\log n)$ | 
| Heap Sort | $O(n\log n)$ | $O(n\log n)$ | $O(n\log n)$ | $O(1)$ | 

* * *

# 76. API Example

### Request

```
POST /api/v1/payments HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "amount": 1250,
  "currency": "INR",
  "merchantReference": "ORDER-12345"
}
```

### Response

```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "pay_123456",
  "status": "AUTHORIZED",
  "amount": 1250,
  "currency": "INR"
}
```

* * *

# 77. HTTP Headers

```
GET /api/users?page=1 HTTP/1.1
Host: example.com
Accept: application/json
Accept-Encoding: gzip, deflate, br
Authorization: Bearer eyJhbGciOi...
Cache-Control: no-cache
User-Agent: ExampleClient/1.0
X-Request-ID: 7f9c8d3a-8f55-4c77-a9b1-123456789abc
```

* * *

# 78. JSON With Special Characters

```
{
  "message": "Hello \"World\"",
  "path": "C:\\Users\\Test",
  "unicode": "नमस्ते",
  "emoji": "🚀",
  "newline": "line1\nline2",
  "quote": "She said: \"hello\""
}
```

* * *

# 79. SQL Stress Test

```
SELECT
    d.department_name,
    COUNT(e.employee_id) AS employee_count,
    AVG(e.salary) AS average_salary,
    MAX(e.salary) AS maximum_salary,
    MIN(e.salary) AS minimum_salary
FROM departments d
LEFT JOIN employees e
    ON e.department_id = d.department_id
WHERE e.hire_date >= DATE '2020-01-01'
GROUP BY d.department_name
HAVING COUNT(e.employee_id) > 5
ORDER BY average_salary DESC;
```

* * *

# 80. Regex

```
^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

Inline regex:

`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

* * *

# 81. Shell Output

```
$ git status

On branch main
Your branch is ahead of 'origin/main' by 2 commits.

Changes not staged for commit:
  modified:   src/main/java/App.java
  modified:   README.md

Untracked files:
  test-output.pdf

no changes added to commit
```

* * *

# 82. Git Diff

```
- const timeout = 1000;
+ const timeout = 5000;

- console.log("Old implementation");
+ console.log("New implementation");

+ if (!response.ok) {
+     throw new Error("Request failed");
+ }
```

* * *

# 83. Log Output

```
2026-08-22 10:15:31.004 INFO  Application started
2026-08-22 10:15:31.102 INFO  Database connection established
2026-08-22 10:15:32.401 WARN  Cache miss for key=user:123
2026-08-22 10:15:33.884 ERROR Payment failed
2026-08-22 10:15:33.885 ERROR java.net.SocketTimeoutException: Read timed out
2026-08-22 10:15:33.886 INFO  Retrying request attempt=2
```

* * *

# 84. Security Example

> ⚠️ **Security Notice**
> 
> Never store passwords, API keys, access tokens, or private keys directly in source code.

Bad:

```
API_KEY="sk_test_EXAMPLE_ONLY"
PASSWORD="super-secret-password"
```

Better:

```
API_KEY=${API_KEY}
PASSWORD=${DATABASE_PASSWORD}
```

* * *

# 85. Nested Everything

> ## Nested Stress Test
> 
> 1.  **Step One**
>     
>     This step contains:
>     
>     *   _Italic text_
>         
>     *   **Bold text**
>         
>     *   `inline code`
>         
>     *   $x^2$
>         
>     
>     ```
>     System.out.println("Nested code block");
>     ```
>     
> 2.  **Step Two**
>     
>     | Name | Value | 
>     |---|---|
>     | A | 10 | 
>     | B | 20 | 
>     
> 3.  **Step Three**
>     
>     > Nested quote
>     
>     $E=mc2$
>     

* * *

# 86. HTML Details Element

<details> <summary>Click to expand</summary>

This is hidden content inside a details element.

It contains **Markdown-like formatting**, although actual Markdown support inside HTML varies by parser.

</details>

* * *

# 87. Keyboard Shortcuts

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd> on macOS to capture a screenshot.

Press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Delete</kbd> on Windows.

* * *

# 88. Superscript / Subscript HTML

H<sub>2</sub>O

E = mc<sup>2</sup>

x<sup>n</sup>

log<sub>2</sub>(x)

* * *

# 89. Color / Mark HTML

<mark>Highlighted text</mark>

<small>Small text</small>

<del>Deleted text</del>

<ins>Inserted text</ins>

* * *

# 90. Unicode Box Drawing

```
┌──────────────────────────────┐
│        SYSTEM STATUS         │
├──────────────────────────────┤
│ CPU       │ 42%              │
│ Memory    │ 68%              │
│ Disk      │ 71%              │
│ Network   │ 12 Mbps          │
└──────────────────────────────┘
```

* * *

# 91. Unicode Mathematical Symbols

```
∀x ∈ ℝ, x² ≥ 0

∑ᵢ₌₁ⁿ xᵢ

∫₀∞ e⁻ˣ dx = 1

limₓ→∞ f(x)

ℝ ℚ ℤ ℕ ℂ
```

* * *

# 92. Right-to-Left Text

English → العربية → English

العربية لغة جميلة

עברית היא שפה עתיקה

* * *

# 93. Mixed Directionality

User: مرحباً Alice، how are you?

Transaction: TXN-12345-مرحبا-ABC

Mixed: English العربية 日本語 हिन्दी 中文

* * *

# 94. File Paths

Windows:

`C:\Program Files\Java\jdk-21\bin\java.exe`

macOS:

`/Applications/Visual Studio Code.app/Contents/MacOS/Electron`

Linux:

`/usr/local/bin/python3`

Relative:

`../../src/main/resources/application.properties`

* * *

# 95. Environment Variables

```
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH
DATABASE_URL=jdbc:postgresql://localhost:5432/example
SPRING_PROFILES_ACTIVE=dev
```

* * *

# 96. YAML + Comments

```
# Application configuration
server:
  port: 8080

spring:
  application:
    name: example-service

  # Database configuration
  datasource:
    url: jdbc:postgresql://localhost:5432/example
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
```

* * *

# 97. Mathematical Optimization

$x∈Rnminf(x)$

subject to

$gi(x)≤0,i=1,…,m$

and

$hj(x)=0,j=1,…,p.$

* * *

# 98. Machine Learning Equations

Linear regression:

$y^=Xβ+ϵ$

Mean squared error:

$MSE=n1i=1∑n(yi−y^i)2$

Gradient descent:

$θt+1=θt−η∇θJ(θt)$

Sigmoid:

$σ(x)=1+e−x1$

* * *

# 99. Neural Network Equation

$z(l)=W(l)a(l−1)+b(l)$ $a(l)=f(z(l))$

* * *

# 100. Big Equation

$P(Y=y∣X=x)=∑k=1KP(X=x∣Y=k)P(Y=k)P(X=x∣Y=y)P(Y=y)$

* * *

# 101. Citation-Like Text

According to Example Documentation, the system supports Markdown.

Reference: [RFC 2616](https://www.rfc-editor.org/rfc/rfc2616)

Another reference: [MDN Web Docs](https://developer.mozilla.org/)

* * *

# 102. Image + Caption-Like Text

_Figure 1. Example system architecture._

The caption should remain visually associated with the image if the PDF renderer supports figure-like layouts.

* * *

# 103. Table Immediately After Image

| Metric | Current | Previous | Change | 
|---|---|---|---|
| Revenue | ₹10.2M | ₹9.4M | +8.5% | 
| Users | 125K | 118K | +5.9% | 
| Conversion | 4.8% | 4.2% | +14.3% | 

* * *

# 104. Code Immediately Before Mathematics

```
double result = Math.sqrt(
    Math.pow(a, 2) + Math.pow(b, 2)
);
```

$c=a2+b2$

* * *

# 105. Mathematics Immediately Before Code

$T(n)=2T(n/2)+n$

```
Master theorem:
a = 2
b = 2
f(n) = n
```

Therefore:

$T(n)=O(nlogn)$

* * *

# 106. Long Table With Mathematical Content

| $n$ | $n^2$ | $n^3$ | $\log_2 n$ | $2^n$ | 
|---|---|---|---|---|
| 1 | 1 | 1 | 0 | 2 | 
| 2 | 4 | 8 | 1 | 4 | 
| 4 | 16 | 64 | 2 | 16 | 
| 8 | 64 | 512 | 3 | 256 | 
| 16 | 256 | 4096 | 4 | 65,536 | 
| 32 | 1024 | 32,768 | 5 | 4,294,967,296 | 

* * *

# 107. Empty Table Cells

| A | B | C | D | 
|---|---|---|---|
| 1 |  | 3 |  | 
|  | 5 |  | 7 | 
| 8 |  |  | 11 | 

* * *

# 108. Table With Special Characters

| Operator | Meaning | Example | 
|---|---|---|
| && | AND | a && b | 
| ` |  | ` | 
| != | Not equal | a != b | 
| <= | Less/equal | a <= b | 
| >= | Greater/equal | a >= b | 
| \| | Literal pipe | a \| b | 

* * *

# 109. Long Heading

## This Is an Intentionally Extremely Long Heading Designed to Test Whether the Markdown-to-PDF Converter Correctly Wraps Heading Text Across Multiple Lines Without Clipping, Overlapping, Changing the Font Size Unexpectedly, or Losing Heading Hierarchy

* * *

# 110. Long Blockquote

> This is a deliberately long blockquote that should wrap across multiple lines and potentially across a page boundary. The renderer should preserve the quote styling, indentation, typography, and relationship between all lines of the quoted paragraph while ensuring that no text disappears or overflows outside the page.

* * *

# 111. Long List Item

*   This is an intentionally long list item containing enough text to wrap across multiple lines. The continuation lines should remain correctly aligned with the text portion of the list item rather than incorrectly aligning with the bullet itself. The PDF renderer should preserve indentation and spacing.
    

* * *

# 112. Consecutive Code Blocks

```
System.out.println("First");
```

```
print("Second")
```

```
console.log("Third");
```

```
SELECT 1;
```

* * *

# 113. Code Fence Without Language

```
This is a plain code block.
It has no language identifier.
It should still preserve whitespace.
    This line is indented.
        This line is more indented.
```

* * *

# 114. Four-Backtick Fence

```
```java
System.out.println("Nested fence test");
```
```

* * *

# 115. Literal Markdown Inside Code

```
# This is NOT a heading

**This is NOT bold**

| A | B |
|---|---|
| 1 | 2 |

$$
x = y
$$
```

* * *

# 116. HTML Entity Test

&

<

>

"

'

©

®

™

* * *

# 117. Zero-Width / Invisible Character Test

Normal text.

Text with a zero-width space: helloworld

Text with Unicode non-breaking space: hello world

Text with normal space: hello world

* * *

# 118. Repeated Typography

**BOLD**

_ITALIC_

_**BOLD ITALIC**_

STRIKE

<u>UNDERLINE HTML</u>

<mark>HIGHLIGHT</mark>

<small>SMALL</small>

* * *

# 119. Very Short Content

A

B

C

* * *

# 120. Single Character and Symbol Tests

A

1

.

,

:

;

!

?

@

$

%

&

=

/

\

|

~

^

_

`

* * *

# 121. Final Mixed Stress Test

> ## 🚀 Final Integration Test
> 
> This section combines **bold**, _italic_, `code`, [links](https://example.com), mathematics $E=mc^2$, an image, a table, and a code block.
> 
> | Feature | Test | Status | 
> |---|---|---|
> | Markdown | Formatting | ✅ | 
> | Tables | Wide table | ✅ | 
> | Code | Syntax highlighting | ✅ | 
> | Math | LaTeX | ✅ | 
> | Images | Remote image | ✅ | 
> | Unicode | Multilingual | ✅ | 
> | PDF | Pagination | ⏳ | 
> 
> The core equation is:
> 
> $i=1∑ni=2n(n+1)$
> 
> ```
> public static void main(String[] args) {
>     System.out.println("FINAL TEST");
> }
> ```
> 
> **End of test corpus.**

* * *

# END OF EXTREME MARKDOWN → PDF TEST SUITE

```

### What this fixture is specifically trying to break

Your extension should ideally be tested against at least these categories:

| Area | What to verify |
|---|---|
| **Headings** | H1–H6 hierarchy, wrapping, TOC/bookmarks if supported |
| **Paragraphs** | Wrapping, spacing, justification |
| **Bold/italic** | Nested formatting |
| **Strikethrough** | Correct rendering |
| **Lists** | Ordered, unordered, nested, mixed, task lists |
| **Blockquotes** | Nested quotes + page breaks |
| **Tables** | Alignment, wide tables, long cells, empty cells, Markdown inside cells |
| **Code** | Java, Python, JS, TS, SQL, XML, JSON, YAML, Bash, C++, COBOL, HTML, regex |
| **Long code** | Horizontal overflow + page splitting |
| **Math** | Inline LaTeX, display LaTeX, matrices, cases, aligned equations, Greek symbols |
| **Math + tables** | Formula rendering inside tables |
| **Images** | Normal, wide, square, portrait, multiple, broken image, HTML image |
| **HTML** | `<table>`, `<img>`, `<details>`, `<kbd>`, `<mark>`, etc. |
| **Links** | Normal, titled, autolinks, long URLs |
| **Footnotes** | References and definitions |
| **Unicode** | Hindi, Marathi, Arabic, Hebrew, CJK, Cyrillic, Greek, emoji |
| **RTL** | Arabic/Hebrew mixed with English |
| **Symbols** | Currency, mathematical Unicode, arrows, operators |
| **Escaping** | Literal Markdown characters |
| **HTML entities** | `&amp;`, `&lt;`, `&nbsp;`, etc. |
| **Nested content** | Lists → code → math → tables → quotes |
| **Pagination** | Paragraphs, tables, code, blockquotes crossing pages |
| **Typography** | Quotes, dashes, ellipsis, superscript/subscript |
| **Malformed content** | Broken image, unusual syntax, very long tokens |
| **Whitespace** | Blank lines, trailing spaces, indentation |
| **Syntax preservation** | Literal Markdown inside code blocks |
| **Special fences** | Nested backticks/four-backtick fences |
| **Accessibility** | Image alt text, heading hierarchy, table headers |
| **PDF layout** | Margins, clipping, orphaned headings, overflow, page breaks |

One particularly important thing I'd add to your **automated test suite** is a set of **"expected invariants"** rather than only visually checking the PDF. For example: *every H1–H6 survives, every table has the same number of rows, every fenced code block survives byte-for-byte, every LaTeX expression survives, every image has its alt text, and no source URL silently disappears.* That will catch extraction bugs that a visual PDF comparison can miss.
```

---

### **User Prompt**

show me images 1 ater another from various sources show me all the variations of underroot, underroot within underroot, all the most complex variations of underroot available show me all types of tables you can generate, simple, complex all tables show me all matrics simple and complex, all big bracket functions, all mathematical symbols show me code blocks of various languages

---

### **LLM Response**

Yes — for this kind of extension test, I would make this a **separate extreme fixture** focused specifically on **images + radicals + matrices + mathematical notation + tables + code**.

I’ve included actual external image URLs from Wikimedia Commons so you can test whether your extension can fetch and preserve images rather than merely rendering placeholders. The image sources include different dimensions and formats, including JPEG/PNG and very large images. [![](https://www.google.com/s2/favicons?domain=https://commons.wikimedia.org&sz=128)Wikimedia Commons+2![](https://www.google.com/s2/favicons?domain=https://commons.wikimedia.org&sz=128)Wikimedia Commons+2](https://commons.wikimedia.org/wiki/File%3AMountainLandscape.jpg?utm_source=chatgpt.com)

# 1. Images — one after another

Use these **literally as Markdown images** in your test input.

### Image 1 — Mountain

### Image 2 — Different mountain image

### Image 3 — Portrait-oriented image

### Image 4 — Snowy mountain

### Image 5 — Cat

### Image 6 — Solar System

### Image 7 — Mandelbrot fractal

### Image 8 — Fractal

### Image 9 — Mandelbar fractal

### Image 10 — Fibonacci fractal

**Important image tests:** test the PDF with images that are landscape, portrait, square-ish, very large, PNG, JPEG, SVG, repeated images, and images immediately adjacent to text/tables/code. Some of these Commons files have very large originals, so they are particularly useful for testing memory and image-resizing behavior. [![](https://www.google.com/s2/favicons?domain=https://commons.wikimedia.org&sz=128)Wikimedia Commons+1](https://commons.wikimedia.org/wiki/File%3AMountain_Landscape_2025.jpg?utm_source=chatgpt.com)

* * *

# 2. EXTREME RADICAL / SQUARE-ROOT TEST

The basic radical is:

$x$

A square root with a number:

$2$ $3$ $10$ $100$ $x2$

* * *

## Square roots containing expressions

$x+y$ $x−y$ $x2+y2$ $a2+b2+c2$ $x2+2xy+y2$ $(x+y)2$ $x−yx+y$ $c2+d2a2+b2$

* * *

# 3. Nested Square Roots

Basic nested radical:

$x$

Three levels:

$x$

Four levels:

$x$

Five levels:

$x$

Ten levels:

$x$

* * *

# 4. Nested Radicals With Expressions

$1+x$ $1+1+x$ $1+1+x$ $a+b+c+d$ $x+x+x+x$ $2+2+2+2+⋯$

* * *

# 5. Nested Radical Inside a Radical

$a+b+c+d+e$

More complicated:

$x2+y2+z2+a2+b2$

* * *

# 6. Radicals Inside Fractions

$x1$ $x+y1$ $yx$ $x−yx+y$ $c+da+b$ $a+bx+y$

* * *

# 7. Radicals Inside Fractions Inside Radicals

$1−x1+x$ $c+da+b$ $d+e+fa+b+c$

* * *

# 8. Higher-Order Roots

Square root:

$x$

Cube root:

$3x$

Fourth root:

$4x$

Fifth root:

$5x$

Sixth root:

$6x$

Tenth root:

$10x$

Hundredth root:

$100x$

* * *

# 9. Nested Different Root Orders

$3x$ $3x$ $43x$ $543x$

* * *

# 10. Huge Radical

\sqrt{ a + \sqrt{ b + \sqrt{ c + \sqrt{ d + \sqrt{ e + \sqrt{ f + \sqrt{ g + \sqrt{ h + \sqrt{ i + \sqrt{j} } } } } } } } }

* * *

# 11. Radical + Exponent

$x2$ $x4$ $3x6$ $4x8$ $nxm$ $(nx)m$ $nxm=xm/n$

* * *

# 12. Radical Over a Large Fraction

$a2+b2+c2x2+y2+z2$ $i=1∑nyi2i=1∑nxi2$

* * *

# 13. Radical With Matrix

$[acbd]$ $det[acbd]$ $acbd$

* * *

# 14. Radical + Absolute Value

$∣x∣$ $x2+y2$ $∣a+b∣+∣c−d∣$

* * *

# 15. Radical + Summation

$i=1∑nxi2$ $i=1∑n(xi−xˉ)2$ $n−1∑i=1n(xi−xˉ)2$

* * *

# 16. Famous Infinite Nested Radical

$1+21+31+41+51+⋯$

And:

$2+2+2+2+⋯$

* * *

# 17. Continued Radical

$x=a1+a2+a3+a4+⋯$

* * *

# 18. Radical Rationalization

$x1$ $x+y1$ $a+b1$ $a+b+c1$

* * *

# 19. Absolute-Value Radical Identity

$x2=∣x∣$ $(x−y)2=∣x−y∣$ $a2b2=∣ab∣$

* * *

# 20. All Major Matrix Shapes

## 1 × 1

$A=[5]$

## 1 × 3

$A=[123]$

## 3 × 1

$A=123$

## 2 × 2

$A=[1324]$

## 3 × 3

$A=147258369$

## 4 × 4

$A=15913261014371115481216$

* * *

# 21. Rectangular Matrices

## 2 × 4

$A=[aebfcgdh]$

## 4 × 2

$A=acegbdfh$

## 3 × 5

$A=a11a21a31a12a22a32a13a23a33a14a24a34a15a25a35$

* * *

# 22. Large Matrix With Ellipses

$A=a11a21⋮am1a12a22⋮am2a13a23⋮am3⋯⋯⋱⋯a1na2n⋮amn$

* * *

# 23. Diagonal Matrix

$D=d10000d20000d30000d4$

* * *

# 24. Identity Matrices

$I2=[1001]$ $I3=100010001$ $In=10⋮001⋮0⋯⋯⋱⋯00⋮1$

* * *

# 25. Zero Matrix

$03×4=000000000000$

* * *

# 26. Symmetric Matrix

$A=abcbdecef$

* * *

# 27. Upper Triangular Matrix

$U=a00bd0cef$

* * *

# 28. Lower Triangular Matrix

$L=abd0ce00f$

* * *

# 29. Sparse Matrix

$A=5000000020030000000900700$

* * *

# 30. Matrix With Fractions

$A=2151813161914171101$

* * *

# 31. Matrix With Radicals

$A=27173111951323$

* * *

# 32. Matrix With Complex Numbers

$A=[1+i3+2i2−i4−3i]$

* * *

# 33. Matrix Multiplication

$AB=[acbd][egfh]=[ae+bgce+dgaf+bhcf+dh]$

* * *

# 34. Matrix Transpose

$AT=[adbecf]T=abcdef$

* * *

# 35. Matrix Inverse

$A−1=ad−bc1[d−c−ba]$

* * *

# 36. Determinants

$acbd=ad−bc$ $adgbehcfi$

* * *

# 37. Large Determinant

$a11a21a31a41a12a22a32a42a13a23a33a43a14a24a34a44$

* * *

# 38. Matrix Equation

$AX=B$ $X=A−1B$

* * *

# 39. Large Block Matrix

$A=[A11A21A12A22]$

* * *

# 40. Matrix Inside Matrix

$[1324][9111012][5768][13151416]$

* * *

# 41. Augmented Matrix

$147258369102030$

* * *

# 42. Matrix With Brackets, Parentheses and Vertical Bars

$[1324](1324)1324{1324}$

* * *

# 43. All Major Big Bracket Types

Parentheses:

$(x−1x+1)$

Square brackets:

$[x−1x+1]$

Curly braces:

${x−1x+1}$

Vertical bars:

$x−1x+1$

Double vertical bars:

$x−1x+1$

Angle brackets:

$⟨x,y,z⟩$

Floor:

$⌊2x⌋$

Ceiling:

$⌈2x⌉$

* * *

# 44. Giant Nested Brackets

$[({∣x+(y+[z])∣})]$

* * *

# 45. Piecewise Functions

$f(x)=⎩⎨⎧x2,0,−x2,x>0x=0x<0$

* * *

# 46. Complex Piecewise Function

$f(x)=⎩⎨⎧x2+1,x+1x2+1,∣x∣+1−x2,0,x>100<x≤10−1≤x≤0x<−1$

* * *

# 47. Systems of Equations

${x+y=102x−y=5$

More complex:

$⎩⎨⎧a11x+a12y+a13z=b1a21x+a22y+a23z=b2a31x+a32y+a33z=b3$

* * *

# 48. Big Operator Symbols

$i=1∑ni$ $i=1∏ni$ $i=1∐nAi$ $i=1⋃nAi$ $i=1⋂nAi$ $i=1⨁nAi$ $i=1⨂nAi$

* * *

# 49. Limits

$x→0limxsinx=1$ $x→∞limx1=0$ $n→∞lim(1+n1)n=e$

* * *

# 50. Integrals

$∫x2dx$ $∫01x2dx$ $∬Df(x,y)dA$ $∭Vf(x,y,z)dV$ $∮CF⋅dr$

* * *

# 51. Derivatives

$dxdy$ $dx2d2y$ $∂x∂f$ $∂x∂y∂2f$ $∇f$ $∇2f$

* * *

# 52. All Major Mathematical Symbol Categories

### Arithmetic

$+−×÷±∓$

### Relations

$==<>≤≥≈≡$

### Logic

$∧∨¬⇒⇔$ $∀∃∄$

### Set theory

$∈∈/⊂⊆$ $⊃⊇∪∩$ $∅$

### Number sets

$NZQRC$

### Greek

$α β γ δ ϵ ε ζ η$ $θ ϑ ι κ λ μ ν$ $ξ π ρ σ τ υ ϕ χ ψ ω$

### Capital Greek

$Γ Δ Θ Λ Ξ Π Σ Υ Φ Ψ Ω$

* * *

# 53. Arrows

$→←↔$ $⇒⇐⇔$ $↑↓↕$ $↦⟶⟼$ $↪↩$ $↗↖↘↙$

* * *

# 54. Accents

$x^xˉx~$ $xx˙x¨$ $AB$ $x$ $ABC$

* * *

# 55. Physics Symbols

$F=ma$ $E=mc2$ $p=mv$ $V=IR$ $P=VI$ $λ=ph$ $E=hν$ $ΔxΔp≥2ℏ$

* * *

# 56. Probability

$P(A)$ $P(A∣B)$ $P(A∩B)$ $P(A∪B)$ $P(Ac)$ $E[X]$ $Var(X)$ $Cov(X,Y)$

* * *

# 57. Statistics

$xˉ$ $μ$ $σ$ $σ2$ $s2$ $z=σx−μ$ $χ2$ $E[X]$

* * *

# 58. Information Theory

$H(X)=−x∑P(x)logP(x)$ $H(X,Y)=−x,y∑P(x,y)logP(x,y)$ $I(X;Y)=x,y∑P(x,y)logP(x)P(y)P(x,y)$

* * *

# 59. Complex ML Formula

$L(θ)=−N1i=1∑N[yilog(y^i)+(1−yi)log(1−y^i)]+λ∥θ∥22$

* * *

# 60. TABLE TEST SUITE

## Simple

| Name | Age | 
|---|---|
| Alice | 25 | 
| Bob | 30 | 

## Three columns

| Product | Quantity | Price | 
|---|---|---|
| Laptop | 2 | ₹100000 | 
| Mouse | 5 | ₹2500 | 

## Alignment

| Left | Center | Right | 
|---|---|---|
| A | B | C | 
| Apple | Banana | Cherry | 

## Empty cells

| A | B | C | 
|---|---|---|
| 1 |  | 3 | 
|  | 5 |  | 
| 7 |  | 9 | 

## Long text

| ID | Description | Result | 
|---|---|---|
| 1 | This is an extremely long description intended to test wrapping inside a table cell and determine whether the table correctly expands vertically without overlapping adjacent rows. | PASS | 
| 2 | Another very long description containing inline code, bold text, italic text, and mathematical content $x^2+y^2=z^2$. | PASS | 

## Mathematical table

| Function | Formula | Complexity | 
|---|---|---|
| Linear | $f(x)=x$ | $O(1)$ | 
| Logarithmic | $f(x)=\log x$ | $O(\log n)$ | 
| Quadratic | $f(x)=x^2$ | $O(n^2)$ | 
| Exponential | $f(x)=2^x$ | $O(2^n)$ | 

## Wide table

| ID | Name | Email | Department | Country | City | Role | Salary | Status | Created | Updated | 
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Alice Anderson | alice@example.com | Engineering | India | Mumbai | Engineer | ₹1,500,000 | Active | 2024-01-01 | 2026-08-22 | 
| 2 | Bob Brown | bob@example.com | Finance | USA | New York | Analyst | $120,000 | Active | 2023-05-12 | 2026-08-20 | 
| 3 | Charlie Clark | charlie@example.com | Research | Germany | Berlin | Scientist | €95,000 | Active | 2022-03-10 | 2026-08-19 | 

## Very wide

| A | B | C | D | E | F | G | H | I | J | K | L | 
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 
| 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 

## Table containing code

| Language | Example | 
|---|---|
| Java | System.out.println("Hello"); | 
| Python | print("Hello") | 
| JavaScript | console.log("Hello"); | 
| SQL | SELECT * FROM users; | 

## Table containing lists

| Category | Items | 
|---|---|
| Fruits | Apple, Banana, Orange | 
| Languages | Java, Python, C++ | 
| Databases | PostgreSQL, MySQL, MongoDB | 

## Table containing images

| Image | Description | 
|---|---|
|  | Mountain | 
|  | Cat | 

* * *

# 61. CODE BLOCK TEST SUITE

## Java

```
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

## Python

```
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(10))
```

## C

```
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
```

## C++

```
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 9, 1, 5};

    std::sort(v.begin(), v.end());

    for (int x : v) {
        std::cout << x << '\n';
    }
}
```

## C#

```
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
```

## JavaScript

```
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

const names = users.map(user => user.name);

console.log(names);
```

## TypeScript

```
interface User {
    id: number;
    name: string;
}

function greet(user: User): string {
    return `Hello, ${user.name}!`;
}
```

## Go

```
package main

import "fmt"

func main() {
    values := []int{1, 2, 3, 4, 5}

    for _, value := range values {
        fmt.Println(value)
    }
}
```

## Rust

```
fn main() {
    let values = vec![1, 2, 3, 4, 5];

    for value in values {
        println!("{}", value);
    }
}
```

## Kotlin

```
fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)

    numbers
        .filter { it % 2 == 0 }
        .forEach { println(it) }
}
```

## Swift

```
let numbers = [1, 2, 3, 4, 5]

let evens = numbers.filter {
    $0 % 2 == 0
}

print(evens)
```

## PHP

```
<?php

$users = ["Alice", "Bob", "Charlie"];

foreach ($users as $user) {
    echo "Hello, $user\n";
}
```

## Ruby

```
users = ["Alice", "Bob", "Charlie"]

users.each do |user|
  puts "Hello, #{user}"
end
```

## Dart

```
void main() {
  final numbers = [1, 2, 3, 4, 5];

  final squares = numbers
      .map((x) => x * x)
      .toList();

  print(squares);
}
```

## Scala

```
object Main extends App {
  val numbers = List(1, 2, 3, 4, 5)

  val squares = numbers.map(x => x * x)

  println(squares)
}
```

## R

```
numbers <- c(1, 2, 3, 4, 5)

squares <- numbers^2

print(squares)
```

## SQL

```
SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 5
ORDER BY average_salary DESC;
```

## Bash

```
#!/bin/bash

set -e

echo "Starting..."

for file in *.txt; do
    echo "Processing: $file"
done

echo "Done."
```

## PowerShell

```
$users = Get-LocalUser

foreach ($user in $users) {
    Write-Host $user.Name
}
```

## HTML

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a test.</p>
</body>
</html>
```

## CSS

```
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.card {
    padding: 20px;
    border-radius: 12px;
}
```

## JSON

```
{
  "name": "test",
  "version": "1.0.0",
  "enabled": true,
  "items": [1, 2, 3]
}
```

## YAML

```
application:
  name: test-service
  version: 1.0.0

server:
  port: 8080

database:
  host: localhost
  port: 5432
```

## XML

```
<?xml version="1.0" encoding="UTF-8"?>
<users>
    <user id="1">
        <name>Alice</name>
        <active>true</active>
    </user>
</users>
```

## GraphQL

```
query GetUsers {
    users {
        id
        name
        email
    }
}
```

## Regex

```
^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$
```

## Dockerfile

```
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY target/app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Nginx

```
server {
    listen 80;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Markdown

```
# Example

**Bold**

*Italic*

```java
System.out.println("Nested");
```

$$
E=mc^2
$$
```

## Plain text

```
This is plain text.

    Indented text.

        More indentation.

Symbols:
< > [ ] { } ( ) | \ / & % $ # @ !
```

* * *

# 62. The Ultimate Combined Mathematical Test

$f(x)=n−1i=1∑n(xi−xˉ)2=n−1i=1∑n(xi−n1j=1∑nxj)2$

* * *

# 63. The Ultimate Matrix + Radical Test

$A=a11a212+b2124a31+b31a12+b12b22a22a323a13c23+d23a23+b23c332+d332a332−b332$

* * *

# 64. The Ultimate Piecewise + Matrix Test

$F(x)=⎩⎨⎧[xx2x3x],[0000],[∣x∣4x4x2+1−x],x>0x=0x<0$

* * *

# 65. The Ultimate "Everything at Once" Formula

$⎩⎨⎧Xf(x)=A−1n∑i=1nxi2a+b+c+dx−yx+y={x2+x,−x2+∣x∣,x≥0x<0$

This last one is especially useful for your PDF renderer because it simultaneously tests:

*   `\boxed`
    
*   `\left\{`
    
*   `aligned`
    
*   `cases`
    
*   matrices
    
*   arrays
    
*   fractions
    
*   nested radicals
    
*   nth roots
    
*   summations
    
*   subscripts
    
*   superscripts
    
*   absolute values
    
*   multiline equations
    
*   large delimiters
    
*   vertical spacing
    
*   page-width handling
    

* * *

### A few external reference images worth visually comparing against

The radical notation examples in OpenStax explicitly distinguish the radical sign from its radicand, while their examples include nested square roots such as $\sqrt{\sqrt{16}}$. [![](https://www.google.com/s2/favicons?domain=https://openstax.org&sz=128)OpenStax+1](https://openstax.org/books/elementary-algebra-2e/pages/9-1-simplify-and-use-square-roots?utm_source=chatgpt.com)

8

For matrix rendering, a useful reference is the conventional $m\times n$ matrix layout with indexed elements $a_{ij}$ and row/column notation.

The key thing I'd test next is **PDF pagination**: put the huge matrices, giant nested radicals, wide tables, and 50–100-line code blocks immediately before/after images. That's where many otherwise-good Markdown→PDF converters start clipping content, splitting equations incorrectly, or producing blank/overflowing pages.

---


*Exported with Chat-a-logue*
