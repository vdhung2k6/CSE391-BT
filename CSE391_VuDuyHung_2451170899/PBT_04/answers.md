# 📝 PHIẾU BÀI TẬP 04 — CSS LAYOUT
## Phần A + C: Kiểm tra Đọc Hiểu & Suy Luận

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | ✅ Có | Document flow (default) | ✅ Có | Vị trí bình thường, không dùng positioning |
| `relative` | ✅ Có | Vị trí ban đầu của chính nó | ✅ Có | Dịch phần tử nhẹ mà vẫn giữ chỗ trong flow; cơ sở cho absolute children |
| `absolute` | ❌ Không | Nearest positioned ancestor (hoặc body) | ✅ Có | Badge, modal, tooltip — lấy ra khỏi flow |
| `fixed` | ❌ Không | Viewport (khung nhìn) | ❌ Không (dính viewport) | Header cố định, button "back to top" |
| `sticky` | ✅ Có (đến khi dính) | Scrolling container | ✅ Dính khi scroll | Sidebar, header cột, filter menu |

**Giải thích "nearest positioned ancestor":**
- Khi dùng `position: absolute`, phần tử sẽ tham chiếu vị trí từ **ancestor gần nhất có `position` ≠ `static`** (tức `relative`, `absolute`, `fixed`, `sticky`)
- Nếu không có ancestor nào được positioned, `absolute` sẽ tham chiếu tới `<body>` (hay `<html>`)
- Ví dụ:
  ```html
  <div class="parent"> <!-- position: static (default) -->
    <div class="child"> <!-- position: absolute -->
      <!-- Sẽ tham chiếu tới body, không phải parent -->
    </div>
  </div>
  
  <div class="parent" style="position: relative;">
    <div class="child"> <!-- position: absolute -->
      <!-- Sẽ tham chiếu tới parent -->
    </div>
  </div>
  ```

---

### Câu A2 (10đ) — Flexbox vs Grid — Dự đoán Layout

#### **Trường hợp 1: Flex 1 hàng**
```css
.container { display: flex; }
.item { flex: 1; }
/* 4 items → 1 hàng, 4 items đều chiều rộng */
```
**Sơ đồ:**
```
┌───────┬───────┬───────┬───────┐
│ Item1 │ Item2 │ Item3 │ Item4 │
└───────┴───────┴───────┴───────┘
```

#### **Trường hợp 2: Flex wrap 45% + margin**
```css
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → 2 hàng, 2 items/hàng */
```
**Sơ đồ:**
```
┌─────────────────┬─────────────────┐
│     Item1       │     Item2       │
├─────────────────┼─────────────────┤
│     Item3       │     Item4       │
├─────────────────┼─────────────────┤
│     Item5       │     Item6       │
└─────────────────┴─────────────────┘
```

#### **Trường hợp 3: Flex space-between + center**
```css
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → 1 hàng, items cách đều (hai đầu sát mép) */
```
**Sơ đồ:**
```
│ Item1                Item2                Item3 │
```

#### **Trường hợp 4: Grid 3 cột fix 200px-1fr-200px**
```css
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → 1 hàng, 3 cột: 200px (fixed) - flexible - 200px (fixed) */
```
**Sơ đồ:**
```
┌─────────┬─────────────────────────────┬─────────┐
│ 200px   │          1fr (flex)         │ 200px   │
│ Item1   │          Item2              │ Item3   │
└─────────┴─────────────────────────────┴─────────┘
```

#### **Trường hợp 5: Grid 3 cột repeat(3, 1fr) — 7 items**
```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → 3 hàng: 2 hàng đầy (3 items/hàng) + 1 hàng cuối (1 item) */
```
**Sơ đồ:**
```
┌──────────┬──────────┬──────────┐
│ Item1    │ Item2    │ Item3    │
├──────────┼──────────┼──────────┤
│ Item4    │ Item5    │ Item6    │
├──────────┼──────────┼──────────┤
│ Item7    │          │          │
└──────────┴──────────┴──────────┘
(Item7 ở góc trái, 2 ô còn lại trống)
```

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

| Tình huống | Công cụ | Giải thích |
|-----------|---------|-----------|
| 1. Navigation bar ngang (logo + menu + buttons) | **Flexbox** | 1 chiều (ngang), items căn lề & khoảng cách. Flexbox hoàn hảo cho layout 1D. |
| 2. Lưới ảnh Instagram (3 cột đều, số ảnh không biết trước) | **Flexbox** hoặc **Grid** | Flexbox `flex-wrap` đơn giản. Grid `grid-template-columns: repeat(3, 1fr)` cũng tốt. **Khuyên: Flexbox** vì số ảnh biến đổi. |
| 3. Layout blog: main content + sidebar | **Grid** hoặc **Flexbox** | Grid với `grid-template-columns: 1fr 250px` sạch hơn. Hoặc Flexbox cũng được, nhưng Grid dễ kiểm soát layout 2D hơn. **Khuyên: Grid** để cấu trúc rõ ràng. |
| 4. Footer với 4 cột thông tin | **Grid** hoặc **Flexbox** | Grid `grid-template-columns: repeat(4, 1fr)` quản lý 4 cột dễ. **Khuyên: Grid** để đảm bảo các cột bằng nhau. |
| 5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút dính đáy) | **Flexbox** + `flex-direction: column` | Card cần layout 1 cột (ảnh → text → nút). Dùng `display: flex; flex-direction: column` + nút có `margin-top: auto` để dính đáy. |

---

### Câu C2 (10đ) — Debug Flexbox

#### **Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống**

**Code lỗi:**
```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```

**Nguyên nhân lỗi:**
- `.card` chỉ là `flex` trong container, nhưng bản thân `.card` không dùng flexbox
- Content bên trong card (ảnh, text, nút) không được sắp xếp dọc, dẫn nút có chiều cao khác nhau
- Khi số dòng text khác, nút tự động nhảy vị trí

**Code sửa:**
```css
.card-container { 
    display: flex; 
    flex-wrap: wrap; 
}
.card { 
    width: 30%; 
    margin: 1.5%;
    /* ✅ Thêm flexbox cho card bản thân */
    display: flex;
    flex-direction: column;
    height: 100%; /* Đảm bảo tất cả card cùng chiều cao */
}
.card img { 
    width: 100%; 
}
.card h3 { 
    font-size: 18px; 
}
.card .btn { 
    padding: 10px;
    /* ✅ Nút dính đáy card */
    margin-top: auto;
}
```

**Chứng minh trước/sau:** (Sẽ chụp khi code Bài B2)

---

#### **Lỗi 2: Items không nằm giữa khi dùng flex**

**Code lỗi:**
```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```

**Nguyên nhân lỗi:**
- `.hero` dùng `display: flex` nhưng không có `justify-content` (căn ngang) + `align-items` (căn dọc)
- Item vẫn dính góc trái trên (vị trí mặc định)
- `text-align: center` chỉ căn text trong element, không căn element bản thân

**Code sửa:**
```css
.hero {
    height: 100vh;
    display: flex;
    /* ✅ Căn giữa ngang */
    justify-content: center;
    /* ✅ Căn giữa dọc */
    align-items: center;
}
.hero-content {
    text-align: center; /* Vẫn cần để căn text bên trong */
}
```

**Chứng minh trước/sau:** (Sẽ chụp khi code Bài B1)

---

#### **Lỗi 3: Sidebar bị co lại khi content quá dài**

**Code lỗi:**
```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```

**Nguyên nhân lỗi:**
- `.sidebar` chỉ có `width: 250px`, nhưng không có `flex-shrink: 0`
- Khi content quá dài, flexbox tự động co sidebar để đủ chỗ
- Đây là hành vi mặc định: `flex-shrink: 1` (co được)

**Code sửa:**
```css
.layout { 
    display: flex; 
}
.sidebar { 
    width: 250px;
    /* ✅ Không cho phép co sidebar */
    flex-shrink: 0;
}
.content { 
    flex: 1;
    /* Optional: thêm overflow để content scroll nếu cần */
    overflow-y: auto;
}
```

**Giải thích thêm:**
- `flex-shrink: 0` = "Đừng co sidebar, dù content bao nhiêu đi chăng nữa"
- Nếu muốn content scroll khi dài, thêm `overflow-y: auto` hoặc `overflow: hidden`

---

**📝 Ghi chú:**
- Tất cả lỗi trên là **sai lầm phổ biến** khi dùng Flexbox
- Bộ ba "phép thuật" Flexbox: `display: flex`, `justify-content`, `align-items`
- Cho child elements: `flex` (grow/shrink), `margin-top: auto` (dính lề), `flex-shrink: 0` (không co)
