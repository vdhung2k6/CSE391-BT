# 📝 PHIẾU BÀI TẬP 05 — CSS RESPONSIVE & SCSS
## Phần A + C: Kiểm tra Đọc Hiểu & Phân Tích

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

#### 1. Thẻ `<meta viewport>` chuẩn:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

**Giải thích từng thuộc tính:**
- **`name="viewport"`**: Tên thuộc tính chuẩn HTML5 dùng để cấu hình viewport (vùng hiển thị)
- **`width=device-width`**: Chiều rộng viewport = chiều rộng của device (rất quan trọng!)
  - Nếu thiếu, viewport mặc định = 980px trên mobile → trang bị zoom ra, khó đọc
- **`initial-scale=1.0`**: Mức zoom ban đầu = 100% (không zoom)
- **`maximum-scale=5.0`**: Người dùng có thể zoom tối đa đến 500%
- **`user-scalable=yes`**: Cho phép người dùng pinch-zoom (trên mobile)

#### 2. Nếu THIẾU thẻ `<meta viewport>`:

iPhone sẽ hiển thị trang web:
- **Viewport mặc định = 980px** (Desktop width trên mobile)
- Trang sẽ bị **zoom ra 50-70%** để vừa màn hình
- **Text rất nhỏ**, khó đọc
- **Không responsive** — trang sẽ giữ layout desktop dù trên iPhone
- Người dùng phải **pinch-zoom** để đọc → trải nghiệm tệ

**Kết luận:** Thẻ `<meta viewport>` là **bắt buộc** cho web responsive.

#### 3. Mobile-First vs Desktop-First:

**Desktop-First:**
```css
/* Viết CSS cho desktop trước */
.container { width: 1200px; display: grid; grid-template-columns: repeat(4, 1fr); }

/* Dùng max-width để co CSS lại cho mobile */
@media (max-width: 768px) {
    .container { width: 100%; grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
    .container { grid-template-columns: 1fr; }
}
```
- ❌ Viết desktop trước, rồi "override" cho mobile
- ❌ File CSS to hơn (nhiều override)
- ❌ Logic bị lộn xộn

**Mobile-First (Khuyên dùng):**
```css
/* Viết CSS cho mobile trước (default) */
.container { width: 100%; display: grid; grid-template-columns: 1fr; }

/* Dùng min-width để mở rộng cho tablet/desktop */
@media (min-width: 768px) {
    .container { width: 100%; grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
    .container { width: 1200px; grid-template-columns: repeat(4, 1fr); }
}
```
- ✅ Viết mobile trước, dễ tập trung
- ✅ File CSS nhỏ hơn (ít override)
- ✅ Logic rõ ràng: base mobile → expand lên
- ✅ Performance tốt: không load CSS thừa trên mobile

**Tại sao Mobile-First được khuyên?**
- Hầu hết traffic từ mobile (60%+)
- Performance quan trọng trên mobile
- CSS ít → load nhanh hơn
- UX tốt trên mobile = priority

---

### Câu A2 (5đ) — Breakpoints

**Breakpoints chuẩn (theo Bootstrap + Best Practice):**

| Tên | Min-width | Thiết bị | Lưới sản phẩm |
|-----|-----------|---------|---------------|
| **XS (Extra Small)** | `0px` | Mobile nhỏ (iPhone SE) | 1 cột |
| **SM (Small)** | `576px` | Mobile lớn, small tablet | 2 cột |
| **MD (Medium)** | `768px` | Tablet (iPad Mini) | 2-3 cột |
| **LG (Large)** | `992px` | Tablet lớn, laptop nhỏ | 3 cột |
| **XL (Extra Large)** | `1200px` | Desktop | 4 cột |
| **XXL (2XL)** | `1400px` | Desktop lớn (2K+) | 4-5 cột |

**Ví dụ — Lưới sản phẩm mỗi breakpoint:**
```scss
// Mobile-First: mặc định 1 cột
.product-grid { grid-template-columns: 1fr; }

// Tablet nhỏ: 2 cột
@media (min-width: 576px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }

// Tablet: 2-3 cột
@media (min-width: 768px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }

// Laptop: 3 cột
@media (min-width: 992px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }

// Desktop: 4 cột
@media (min-width: 1200px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }
```

---

### Câu A3 (5đ) — Media Queries

Phân tích CSS cho từng kích thước:

```css
.container { width: 100%; padding: 10px; }

@media (min-width: 576px) { .container { width: 540px; } }
@media (min-width: 768px) { .container { width: 720px; } }
@media (min-width: 992px) { .container { width: 960px; } }
@media (min-width: 1200px) { .container { width: 1140px; } }
```

| Chiều rộng màn hình | `.container` width | Giải thích |
|---------------------|--------------------|-----------|
| **375px** (iPhone SE) | `100%` (375px - 20px padding = 355px) | ≤ 576px → áp dụng CSS base |
| **600px** | `540px` | ≥ 576px → áp dụng media (1) |
| **800px** | `720px` | ≥ 768px → áp dụng media (2) |
| **1000px** | `960px` | ≥ 992px → áp dụng media (3) |
| **1400px** | `1140px` | ≥ 1200px → áp dụng media (4) |

**Lưu ý:** `min-width` accumulate → chọn rule mới nhất (có giá trị `min-width` lớn nhất vẫn áp dụng)

---

### Câu A4 (5đ) — SCSS Basics

**4 tính năng chính của SCSS:**

#### 1. **Variables** (`$variable-name`)

```scss
$primary-color: #667eea;
$secondary-color: #764ba2;
$font-main: 'Segoe UI', sans-serif;
$spacing-unit: 8px;

body {
    color: $primary-color;
    font-family: $font-main;
    margin: $spacing-unit;
}

button {
    background-color: $primary-color;
    &:hover { background-color: $secondary-color; }
}
```

**Lợi ích:** Thay đổi 1 chỗ → toàn bộ file tự cập nhật

#### 2. **Nesting** (CSS lồng nhau)

```scss
.card {
    background: white;
    border-radius: 8px;
    
    .card-image {
        width: 100%;
        height: 200px;
    }
    
    .card-title {
        font-size: 18px;
        font-weight: bold;
    }
    
    &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    
    &.featured {
        border: 3px solid $primary-color;
    }
}
```

**Lợi ích:** Không phải lặp lại `.card` nhiều lần, code sạch hơn. `&` là parent selector.

#### 3. **Mixins** (`@mixin` + `@include`)

```scss
// Định nghĩa mixin
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin respond-to($breakpoint) {
    @if $breakpoint == 'tablet' {
        @media (min-width: 768px) { @content; }
    }
    @else if $breakpoint == 'desktop' {
        @media (min-width: 1024px) { @content; }
    }
}

@mixin card-shadow {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

// Sử dụng mixins
.button-container {
    @include flex-center;
    gap: 10px;
}

.card {
    @include card-shadow;
    padding: 20px;
    
    @include respond-to('tablet') {
        padding: 30px;
    }
}
```

**Lợi ích:** Tái sử dụng code patterns, DRY (Don't Repeat Yourself)

#### 4. **@extend / Inheritance**

```scss
.button-base {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.button-primary {
    @extend .button-base;
    background-color: $primary-color;
    color: white;
    
    &:hover {
        background-color: darken($primary-color, 10%);
    }
}

.button-secondary {
    @extend .button-base;
    background-color: $secondary-color;
    color: white;
}
```

**Lợi ích:** Tái sử dụng styles từ 1 class khác, giảm lặp lại

---

#### Tại sao trình duyệt KHÔNG đọc `.scss`? Bước compile:

- **SCSS** là preprocessor → trình duyệt chỉ hiểu **CSS**
- Cần **compile** `.scss` → `.css` bằng công cụ:
  - **Sass CLI**: `sass style.scss style.css`
  - **npm scripts**: `npm run sass` (định nghĩa trong `package.json`)
  - **VS Code Extension**: Live Sass Compiler
  - **Build tools**: Webpack, Vite, Gulp

**Quy trình:**
```
1. Viết .scss
2. Compile .scss → .css (nén/tối ưu)
3. HTML link <link rel="stylesheet" href="style.css">
4. Browser đọc .css file
```

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực

#### Trang web chọn: **Shopee.vn**

**Phân tích 3 kích thước màn hình:**

#### **1. Mobile (375px):**
- **Navigation:**
  - ❌ Không có menu ngang
  - ✅ Có **hamburger menu ☰** góc trái
  - ✅ Search bar toàn chiều rộng phía dưới logo
  - ✅ Icons (cart, account) xếp ngang dưới search

- **Lưới content:**
  - ✅ **1 cột** product cards
  - ❌ Sidebar filter bị ẩn (toggle lên dưới)

- **Ẩn trên mobile:**
  - Categories sidebar
  - Ads banner
  - Footer full (chỉ hiển thị link quan trọng)

- **Font size:**
  - Tiêu đề: 16-18px (nhỏ hơn desktop)
  - Text bình thường: 14px
  - Giá: 16px (to hơn)

#### **2. Tablet (768px):**
- **Navigation:**
  - ✅ Menu ngang hiển thị (Home, Search, Cart)
  - Search bar rộng hơn

- **Lưới content:**
  - ✅ **2 cột** product cards
  - ✅ Sidebar filter hiển thị bên trái (ngang)
  - ✅ Chiều rộng container = 100% - sidebar

- **Font size:**
  - Tiêu đề: 18-20px
  - Bình thường: 14px

#### **3. Desktop (1440px):**
- **Navigation:**
  - ✅ Full menu ngang
  - Categories dropdown
  - Search bar + suggestions
  - Account dropdown

- **Lưới content:**
  - ✅ **4 cột** product cards
  - ✅ Sidebar filter bên trái (sticky)
  - ✅ Ads banner bên phải
  - ✅ Container width = 1200px center

- **Font size:**
  - Tiêu đề: 20px
  - Bình thường: 14-16px

#### **Media Queries mà Shopee dùng:**

```css
/* Mobile-first base */
.navbar { flex-direction: column; }
.product-grid { grid-template-columns: 1fr; }

/* Tablet: ≥768px */
@media (min-width: 768px) {
    .navbar { flex-direction: row; }
    .product-grid { grid-template-columns: repeat(2, 1fr); }
    .sidebar { display: flex; width: 200px; }
}

/* Desktop: ≥1024px */
@media (min-width: 1024px) {
    .product-grid { grid-template-columns: repeat(4, 1fr); }
    .navbar .menu { display: flex; gap: 30px; }
}
```

---

### Câu C2 (10đ) — Thiết kế Responsive Strategy: Trang Đặt Bàn Nhà Hàng

#### **Wireframe - 3 kích thước:**

##### **MOBILE (< 576px):**
```
┌────────────────────────────┐
│ Logo + Điện thoại (ngang)  │ ← Header fixed top
├────────────────────────────┤
│   HERO IMAGE (toàn chiều)  │
│   "Bàn tuyệt vời"          │
├────────────────────────────┤
│ FORM ĐẶT BÀN (1 cột):      │
│ - Ngày                     │
│ - Giờ                      │
│ - Số người                 │
│ - Ghi chú                  │
│ - Button [Đặt bàn]         │
├────────────────────────────┤
│ GRID 6 ẢNH (2 cột x 3)     │
│ Ảnh món ăn                 │
├────────────────────────────┤
│ BẢN ĐỒ GOOGLE MAPS         │
│ (100% chiều rộng, 300px)   │
├────────────────────────────┤
│ FOOTER (collapse)          │
└────────────────────────────┘

Ẩn trên mobile:
- Hero description chi tiết
- Secondary images
- Sidebar rating
```

##### **TABLET (576px - 992px):**
```
┌──────────────────────────────────────┐
│ Logo + Điện thoại (ngang) + Menu     │ ← Header
├──────────────────────────────────────┤
│         HERO IMAGE                   │
├─────────────────┬────────────────────┤
│   FORM (40%)    │  GRID 6 ẢNH (60%)  │
│                 │  (2 cột)           │
│ - Ngày          │                    │
│ - Giờ           │                    │
│ - Số người      │                    │
│ - Ghi chú       │                    │
│ - Button        │                    │
├─────────────────┼────────────────────┤
│      BẢN ĐỒ MAPS (toàn chiều, 350px) │
├──────────────────────────────────────┤
│ FOOTER (2 cột)                       │
└──────────────────────────────────────┘
```

##### **DESKTOP (≥ 992px):**
```
┌──────────────────────────────────────────────────────┐
│   Logo + Điện thoại + Menu ngang + Search + Account  │
├──────────────────────────────────────────────────────┤
│                  HERO IMAGE (full)                   │
├──────────────┬─────────────────────────┬─────────────┤
│ SIDEBAR      │  GRID 6 ẢNH (3 cột)     │  SIDEBAR    │
│ - Rating     │  Ảnh món ăn             │  - Reviews  │
│ - Thời gian  │                         │  - Promo    │
├──────────────┼─────────────────────────┼─────────────┤
│           FORM ĐẶT BÀN (3 cột, hero)               │
│  - Ngày | Giờ | Số người | Ghi chú | [Đặt bàn]    │
├──────────────┴─────────────────────────┴─────────────┤
│        BẢN ĐỒ MAPS (toàn chiều, 400px)             │
├──────────────────────────────────────────────────────┤
│  FOOTER (4 cột: Giờ mở, Menu, Liên hệ, Social)      │
└──────────────────────────────────────────────────────┘
```

#### **CSS Skeleton — Mobile-First:**

```scss
// ============ VARIABLES ============
$breakpoint-tablet: 576px;
$breakpoint-desktop: 992px;
$spacing: 16px;
$primary-color: #d4a574;

// ============ BASE (MOBILE) ============
* { margin: 0; padding: 0; box-sizing: border-box; }

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing;
    background: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
}

.logo { font-size: 20px; font-weight: bold; }
.menu { display: none; } // ẩn trên mobile

.hero {
    margin-top: 60px;
    height: 300px;
    background: url('hero.jpg') center/cover;
    display: flex;
    align-items: flex-end;
    padding: $spacing;
}

.form-container {
    display: grid;
    grid-template-columns: 1fr; // 1 cột mobile
    gap: $spacing;
    padding: $spacing * 2;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 2 cột mobile
    gap: $spacing;
    padding: $spacing * 2;
}

.map {
    width: 100%;
    height: 300px;
    padding: $spacing;
}

.sidebar { display: none; } // ẩn trên mobile

footer {
    display: grid;
    grid-template-columns: 1fr; // 1 cột mobile
    gap: $spacing;
    padding: $spacing * 2;
}

// ============ TABLET (≥576px) ============
@media (min-width: $breakpoint-tablet) {
    .form-container {
        grid-template-columns: 1fr 1fr; // 2 cột
    }
    
    .gallery {
        grid-template-columns: repeat(2, 1fr); // 2 cột
    }
    
    .main-wrapper {
        display: grid;
        grid-template-columns: 40% 60%;
        gap: $spacing * 2;
    }
    
    footer {
        grid-template-columns: repeat(2, 1fr);
    }
}

// ============ DESKTOP (≥992px) ============
@media (min-width: $breakpoint-desktop) {
    .menu { display: flex; } // hiển thị menu
    
    .main-wrapper {
        grid-template-columns: 20% 60% 20%;
    }
    
    .gallery {
        grid-template-columns: repeat(3, 1fr); // 3 cột
    }
    
    .form-container {
        display: flex;
        gap: $spacing;
        align-items: flex-end;
    }
    
    footer {
        grid-template-columns: repeat(4, 1fr);
    }
    
    .sidebar { display: block; }
}
```

**Lưu ý thiết kế:**
- ✅ Mobile-First: base = mobile, mở rộng lên
- ✅ Breakpoints rõ ràng
- ✅ Flexible layout: grid + flex
- ✅ Image responsive: `max-width: 100%`
- ✅ Touch-friendly: padding lớn trên mobile
