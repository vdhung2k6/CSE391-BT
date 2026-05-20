# Câu Trả Lời - Phiếu Bài Tập 03: CSS Core

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — 3 Cách nhúng CSS

**Cách 1: Inline CSS (nhúng trực tiếp trên tag)**

```html
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
```

- **Ưu điểm:** 
  - Áp dụng ngay trên element, không phải tạo file riêng
  - Độ ưu tiên cao (specificity)

- **Nhược điểm:**
  - Không tái sử dụng được
  - Khó bảo trì khi trang web lớn
  - Làm HTML dài dòng, khó đọc

- **Khi nào dùng:** 
  - Chỉ khi cần style 1-2 element duy nhất
  - Testing nhanh, demo tạm thời

---

**Cách 2: Internal CSS (nhúng trong thẻ `<style>`)**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        h1 { color: red; font-size: 24px; }
        p { line-height: 1.6; }
    </style>
</head>
<body>
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
</body>
</html>
```

- **Ưu điểm:**
  - Tái sử dụng được trong 1 trang
  - Dễ quản lý CSS của 1 trang
  - Không cần request file CSS riêng

- **Nhược điểm:**
  - Không tái sử dụng giữa nhiều trang
  - CSS lẫn HTML trong cùng file, khó maintain
  - File HTML bị nặng

- **Khi nào dùng:**
  - Trang web nhỏ (1-2 trang)
  - Email template
  - Page landing đơn giản

---

**Cách 3: External CSS (nhúng file CSS riêng)**

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Tiêu đề</h1>
</body>
</html>
```

```css
/* styles.css */
h1 { color: red; font-size: 24px; }
p { line-height: 1.6; }
```

- **Ưu điểm:**
  - Tái sử dụng trên nhiều trang
  - Dễ bảo trì, quản lý
  - Browser cache file CSS → tải trang nhanh hơn
  - HTML sạch sẽ, tách biệt logic

- **Nhược điểm:**
  - Cần request thêm file → thêm HTTP request
  - Phải tạo 2 file

- **Khi nào dùng:**
  - **Ưu tiên dùng cho mọi website**
  - Website có 3+ trang
  - Dự án lớn, team phát triển

---

**Câu hỏi thêm: Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"?**

**Thứ tự ưu tiên (từ thấp đến cao):**
1. External CSS (lowest priority)
2. Internal CSS
3. Inline CSS (highest priority)

**Giải thích tại sao:**
- Cascade trong CSS: Dòng code **sau sẽ override dòng code trước**
- Inline CSS viết **trực tiếp trên element**, nên được CSS parser đọc **cuối cùng** → thắng
- Internal CSS trong `<head>` được đọc **sau external CSS**
- External CSS được load **đầu tiên**

**Ví dụ:**
```html
<!-- External: style.css có: p { color: blue; } -->
<head>
    <style>
        p { color: red; }  <!-- Internal: override external -->
    </style>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <p style="color: green;">Văn bản</p>  <!-- Inline: sẽ là xanh (green) -->
</body>
```

---

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

**HTML cho:**
```html
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
```

**Dự đoán:**

```
1. h1 
   → Chọn: <h1>ShopTLU</h1> (text: "ShopTLU")

2. .price 
   → Chọn: 2 phần tử <p class="price">
      - <p class="price">25.990.000đ</p>
      - <p class="price">45.990.000đ</p>

3. #app header 
   → Chọn: <header class="top-bar dark"> (descendant selector: element "header" bên trong #app)

4. nav a:first-child 
   → Chọn: <a href="/" class="active">Home</a> (đứa con đầu tiên của nav là tag <a>)

5. .product.featured h2 
   → Chọn: <h2>MacBook Pro</h2> (h2 bên trong .product.featured)
   (chỉ article thứ 2 có cả 2 class: "product" và "featured")

6. article > p 
   → Chọn: 4 phần tử <p> con trực tiếp của <article>
      - <p class="price">25.990.000đ</p>
      - <p>Mô tả sản phẩm...</p> (article 1)
      - <p class="price">45.990.000đ</p>
      - <p>Mô tả sản phẩm...</p> (article 2)

7. a[href="/"] 
   → Chọn: <a href="/" class="active">Home</a> (attribute selector: href="/" chính xác)

8. .top-bar.dark h1 
   → Chọn: <h1>ShopTLU</h1> (h1 bên trong element có cả 2 class: "top-bar" và "dark")
```

---

### Câu A3 (7đ) — Box Model — Tính toán kích thước

**Trường hợp 1: content-box (mặc định)**
```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

- **Chiều rộng hiển thị (visible width):**
  - width = 400px (chỉ content)
  - padding: 20px x 2 = 40px
  - border: 5px x 2 = 10px
  - **Total = 400 + 40 + 10 = 450px**

- **Không gian chiếm trên trang (space taken):**
  - Visible width + margin = 450 + 10 + 10 = **470px**

---

**Trường hợp 2: border-box**
```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```

- **Chiều rộng hiển thị (visible width):**
  - width = 400px (bao gồm content + padding + border!)
  - **Total = 400px** (đã "ôm" padding + border vào)

- **Kích thước content thực tế:**
  - content = 400 - 40 (padding) - 10 (border) = **350px**

- **Không gian chiếm trên trang:**
  - Visible width + margin = 400 + 10 + 10 = **420px**

---

**Trường hợp 3: Margin collapse**
```css
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```

- **Khoảng cách giữa box-a và box-b:**
  - Margin collapse: margin KHÔNG cộng, lấy cái **lớn nhất**
  - margin-bottom (25px) vs margin-top (40px) → lấy **40px**
  - **Khoảng cách = 40px** (KHÔNG PHẢI 65px)

- **Giải thích tại sao KHÔNG PHẢI 65px:**
  - CSS quy định margin của 2 elements liên tiếp **collapsed** (gộp lại)
  - Mục đích: tránh khoảng cách quá lớn không cần thiết
  - **Chỉ áp dụng cho block elements, margins kề nhau, KHÔNG có border/padding giữa**

---

**Nâng cao: Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`:**

- Margin collapse vẫn áp dụng cho negative margins!
- max(−10, 40) = **40px**
- **Khoảng cách = 40px** (dương 40px vẫn thắng)

Nếu cả 2 negative: max(−10, −5) = **−5px** (boxes sẽ overlap!)

---

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

**CSS:**
```css
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```

**HTML:**
```html
<p class="price" id="main-price">Giá</p>
```

---

**1. Tính specificity score (a, b, c) cho mỗi rule:**

Specificity format: **(ID selectors, CLASS selectors, ELEMENT selectors)**

- **Rule A**: `p` → **(0, 0, 1)** — 0 IDs, 0 classes, 1 element
- **Rule B**: `.price` → **(0, 1, 0)** — 0 IDs, 1 class, 0 elements
- **Rule C**: `#main-price` → **(1, 0, 0)** — 1 ID, 0 classes, 0 elements
- **Rule D**: `p.price` → **(0, 1, 1)** — 0 IDs, 1 class, 1 element

**Ưu tiên (từ thấp đến cao):**
- A (0,0,1) < B (0,1,0) < D (0,1,1) < C (1,0,0)

---

**2. Element sẽ có màu gì?**

- **Màu: RED** (quy tắc C thắng)
- **Giải thích:** ID selector `#main-price` có specificity **(1,0,0)** cao nhất
- Thứ tự so sánh: ID đầu tiên (1 > 0) → C thắng, không cần xem tiếp

---

**3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`:**

**Inline style luôn thắng tất cả!**
- Inline style không có trong cascade rule, nó áp dụng **trực tiếp trên element**
- **Màu: ORANGE** (specificity inline > tất cả CSS rules)

---

**4. Nếu Rule A thêm `!important`, element có màu gì?**

```css
p { color: black !important; }
```

- **Màu: BLACK** (vì `!important` thắng tất cả, kể cả inline style)
- **Tại sao?** `!important` là "emergency override" cuối cùng
- **Ưu tiên khi có `!important`:** Inline !important > Other !important > Inline > CSS rules

**Ghi chú:** Không nên dùng `!important` vì nó phá vỡ cascade logic, nhưng khi dùng nó vô địch!

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN

### Câu C1 (10đ) — Debug CSS Layout

**CSS có vấn đề:**
```css
.container { width: 960px; margin: 0 auto; }
.sidebar { width: 300px; padding: 20px; border: 1px solid #ccc; float: left; }
.content { width: 660px; padding: 30px; border: 1px solid #ccc; float: left; }
```

---

**1. Tính chiều rộng THỰC TẾ của sidebar và content (content-box!):**

**(Lưu ý: box-sizing mặc định là content-box)**

- **Sidebar:**
  - width = 300px (content)
  - padding: 20px x 2 = 40px
  - border: 1px x 2 = 2px
  - **Chiều rộng thực tế = 300 + 40 + 2 = 342px**

- **Content:**
  - width = 660px (content)
  - padding: 30px x 2 = 60px
  - border: 1px x 2 = 2px
  - **Chiều rộng thực tế = 660 + 60 + 2 = 722px**

- **Tổng:** 342 + 722 = **1064px** (VƯỢT QUÁ 960px!)

---

**2. Giải thích tại sao layout bị vỡ:**

- Container chỉ rộng 960px
- Nhưng 2 box lại cần 1064px
- Phần thừa: 1064 - 960 = 104px
- Content box bị **đẩy xuống dòng mới** (float left không đủ chỗ)

---

**3. 2 cách sửa:**

**Cách 1: Dùng `border-box` (KHUYẾN NGHỊ)**

```css
* { box-sizing: border-box; }

.container { width: 960px; margin: 0 auto; }
.sidebar { width: 300px; padding: 20px; border: 1px solid #ccc; float: left; }
.content { width: 660px; padding: 30px; border: 1px solid #ccc; float: left; }
```

- Sidebar chiều rộng thực = 300px (width đã bao gồm padding + border)
- Content chiều rộng thực = 660px
- **Tổng = 960px** ✅ Perfect fit!

---

**Cách 2: Không dùng `border-box`, điều chỉnh width**

```css
.sidebar { 
    width: 258px;  /* 300 - 40 (padding) - 2 (border) */
    padding: 20px; 
    border: 1px solid #ccc; 
    float: left; 
}
.content { 
    width: 598px;  /* 660 - 60 (padding) - 2 (border) */
    padding: 30px; 
    border: 1px solid #ccc; 
    float: left; 
}
```

- **Tổng = 258 + 598 = 856px + padding + border = 960px** ✅

---

**4. So sánh:**

- **Cách 1 (border-box):** Đơn giản hơn, không cần tính toán phức tạp
- **Cách 2:** Dễ nhầm lẫn, khó maintain khi thay đổi padding
- **Kết luận:** Dùng `border-box` từ đầu dự án sẽ tiết kiệm thời gian!

---

### Câu C2 (10đ) — Cascade Puzzle

**CSS:**
```css
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```

**HTML:**
```html
<body>
    <div class="container">
        <div class="card" id="featured">
            <h2 class="title highlight">Sản phẩm A</h2>
            <p>Mô tả sản phẩm</p>
        </div>
        <div class="card">
            <h2 class="title">Sản phẩm B</h2>
            <p class="highlight">Mô tả sản phẩm B</p>
        </div>
    </div>
</body>
```

---

**1. "Sản phẩm A" (h2) có `font-size` = ? và `color` = ?**

**Font-size calculation:**
- `body { font-size: 16px; }` → inherit 16px
- `.container { font-size: 14px; }` → override thành 14px
- `.card .title { font-size: 20px; }` → override thành 20px (specific hơn .container)
- **`font-size: 20px`** ✅

**Color calculation:**
- `.card { color: blue; }` → blue (chủ yếu)
- `#featured .title { color: red; }` → specificity (1,0,0) vs .card (0,1,0)
- ID selector thắng! → red
- `.highlight { color: green !important; }` → `!important` thắng tất cả!
- **`color: green`** ✅ (vì !important)

**Đáp án: font-size = 20px, color = green**

---

**2. "Mô tả sản phẩm" (p trong card featured) có `color` = ?**

- `body { color: #333; }` → inherit #333
- `.card p { color: inherit; }` → **inherit từ parent .card**
- `.card { color: blue; }` → .card có color blue
- **`color: blue`** (inherit từ .card, vì .card.color = blue)

**Đáp án: color = blue**

---

**3. "Sản phẩm B" (h2 trong card không featured) có `font-size` = ? và `color` = ?**

**Font-size:**
- Giống với "Sản phẩm A": 20px (dùng rule `.card .title`)
- **`font-size: 20px`** ✅

**Color:**
- `.card { color: blue; }` → blue
- **Khác với "Sản phẩm A"** vì không có ID #featured
- `#featured .title { color: red; }` → KHÔNG áp dụng (không có #featured)
- `.highlight` KHÔNG áp dụng (h2 không có class highlight)
- **`color: blue`** ✅

**Đáp án: font-size = 20px, color = blue**

---

**4. "Mô tả sản phẩm B" (p.highlight) có `color` = ?**

- `body { color: #333; }` → #333
- `.card p { color: inherit; }` → inherit từ .card → blue
- `.highlight { color: green !important; }` → GREEN (vì !important thắng tất cả)
- **`color: green`** ✅ (!important thắng inherit)

**Đáp án: color = green**

---

**TỔNG KẾT QUÁ TRÌNH CASCADE:**

| Element | Font-size | Color | Giải thích |
|---------|-----------|-------|-----------|
| "Sản phẩm A" (h2.title.highlight #featured) | 20px | green | .title (20px), .highlight !important (green thắng #featured) |
| "Mô tả sản phẩm" (p #featured) | 14px (inherit) | blue | inherit từ .card (blue) |
| "Sản phẩm B" (h2.title) | 20px | blue | .title (20px), .card (blue) |
| "Mô tả sản phẩm B" (p.highlight) | 14px (inherit) | green | .highlight !important (green) |

---

**Bài học từ cascade puzzle:**
1. **Specificity**: ID > class > element
2. **Inheritance**: Một số properties (color, font-size) được inherit từ parent
3. **Override**: Rule sau override rule trước (nếu same specificity)
4. **!important**: Thắng tất cả (nhưng KHÔNG nên dùng)
5. **CSS mục tiêu:** Để tính cascade đúng, cần hiểu rõ structure HTML + specificity

