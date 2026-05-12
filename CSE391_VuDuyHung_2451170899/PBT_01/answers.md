# PHIẾU BÀI TẬP 01 — HTML5 FUNDAMENTALS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — HTTP & Browser

#### Năm bước khi gõ `https://shopee.vn` vào trình duyệt

**Tham chiếu:** `01_introduction_html_universe.md` — Client-Server Model

1. **DNS Lookup** — Trình duyệt gửi yêu cầu đến DNS server để phân giải tên miền `shopee.vn` thành địa chỉ IP.

2. **TCP Connection (3-way handshake)** — Thiết lập kết nối TCP với server tại địa chỉ IP vừa tìm được.

3. **HTTP Request** — Trình duyệt gửi HTTP GET request tới server để lấy file `index.html`.

4. **HTTP Response** — Server trả về response với status code 200 (OK) kèm nội dung file HTML.

5. **Parsing & Rendering** — Trình duyệt parse HTML, load CSS + JS, render trang web và hiển thị trên màn hình.

**Bước bổ sung:**
Khi trình duyệt gặp `<img>`, `<link rel="stylesheet">`, `<script>`, nó sẽ gửi thêm request riêng cho từng asset. Server có thể gzip response trước khi gửi, trình duyệt decompress. Trình duyệt lưu cache để request tiếp theo nhanh hơn.

#### Tab Network trong DevTools


Tab Network hiển thị các thông tin sau:
- **Status Code**: Mã trạng thái HTTP như 200 (OK), 404 (Not Found), 500 (Server Error)
- **Tổng thời gian load**: Hiển thị ở dưới cùng dạng "X ms"
- **Các request file CSS**: Hiển thị trong danh sách với Type là "stylesheet"
- **Kích thước file**, thời gian tải, tên file, URL

---

### Câu A2 (5đ) — Semantic HTML

#### Tại sao trang web bị Google đánh giá SEO thấp?

**Tham chiếu:** `04_semantic_html.md`

Trang web dưới đây có các lỗi semantic khiến Google khó nhận diện cấu trúc:

**Lỗi 1:** Dùng `<div class="header">` thay vì `<header>`. Search engine không nhận diện phần header, ảnh hưởng đến SEO. Cách sửa: thay `<div class="header">` thành `<header>`.

**Lỗi 2:** Dùng `<div>` cho navigation thay vì `<nav>`. Google không hiểu đây là menu điều hướng chính. Cách sửa: thay `<div class="menu">` thành `<nav>`.

**Lỗi 3:** Dùng `<div class="main">` thay vì `<main>`. Nội dung chính không được nhận diện rõ ràng. Cách sửa: thay `<div class="main">` thành `<main>`.

**Lỗi 4:** Dùng `<div class="product">` thay vì `<article>`. Mỗi sản phẩm là một article độc lập, không phải div. Cách sửa: thay `<div class="product">` thành `<article>`.

**Lỗi 5:** Dùng `<div class="footer">` thay vì `<footer>`. Footer không được nhận diện. Cách sửa: thay `<div class="footer">` thành `<footer>`.

**HTML đã sửa:**
```html
<header>
    <h1>ShopTLU</h1>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <section id="products">
        <h2>Danh sách sản phẩm</h2>
        <article>
            <h3>iPhone 16 Pro</h3>
            <p>Giá: 25.990.000đ</p>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </article>
    </section>
</main>

<footer>
    <p>&copy; 2026 ShopTLU</p>
</footer>
```

---

### Câu A3 (5đ) — Block vs Inline

#### Vẽ kết quả hiển thị

**Tham chiếu:** `02_html_elements.md` — Block vs Inline

```
┌─────────────────────────────────────┐
│ Hộp 1                               │
└─────────────────────────────────────┘

Text A Text B

┌─────────────────────────────────────┐
│ Hộp 2                               │
└─────────────────────────────────────┘

Text C Text D

┌─────────────────────────────────────┐
│ Hộp 3                               │
└─────────────────────────────────────┘
```

**Giải thích:**
`<div>` là block element, luôn bắt đầu dòng mới và chiếm toàn bộ chiều rộng. `<span>` là inline element, không bắt đầu dòng mới mà nằm cạnh nhau. `<strong>` cũng là inline element nên nằm cạnh text khác. Khi có block element, nó sẽ buộc các phần tử tiếp theo xuống dòng mới.

---

### Câu A4 (5đ) — Table

**Tham chiếu:** `05_tables_hyperlinks.md`

#### Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`

**`<thead>` (Table Head)** — Chứa hàng header (tiêu đề cột), các dòng trong `<thead>` sử dụng `<th>` để đánh dấu là tiêu đề.

**`<tbody>` (Table Body)** — Chứa dữ liệu chính của bảng, các dòng sử dụng `<td>` cho các ô dữ liệu.

**`<tfoot>` (Table Footer)** — Chứa hàng tổng kết hoặc summary, cũng sử dụng `<td>` cho các ô.

**Ví dụ:**
```html
<table>
    <thead>
        <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>iPhone</td>
            <td>25 triệu</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Tổng cộng:</td>
            <td>25 triệu</td>
        </tr>
    </tfoot>
</table>
```

#### Tại sao không nên dùng Table để tạo layout trang web

**Không responsive** — Table cố định chiều rộng, khó tương thích với mobile và tablet.

**Chậm rendering** — Browser phải đợi load hết table mới render, làm trang web chậm.

**Tệ cho SEO và Accessibility** — Screen reader sẽ đọc từng ô của table, nhầm lẫn với dữ liệu thực, khó hiểu cấu trúc trang.

**Khó bảo trì** — Code HTML phức tạp, khó điều chỉnh layout sau này.

---

## PHẦN B — THỰC HÀNH CODE

### Bài B3 (15đ) — Debug HTML

Tìm và sửa 12 lỗi trong file HTML gốc.

**Lỗi 1** — Dòng 1: `<!DOCTYPE>` không đầy đủ. Cách sửa: thay `<!DOCTYPE>` thành `<!DOCTYPE html>`.

**Lỗi 2** — Dòng 2: `<html>` thiếu attribute `lang`. Cách sửa: thay `<html>` thành `<html lang="vi">`.

**Lỗi 3** — Dòng 3: `<head>` thiếu `<meta name="viewport">`. Cách sửa: thêm `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

**Lỗi 4** — Dòng 4: `<meta charset="utf8">` sai chuẩn. Cách sửa: thay `charset="utf8"` thành `charset="UTF-8"`.

**Lỗi 5** — Dòng 5: `<title>Trang web` không đóng tag. Cách sửa: thay thành `<title>Trang web</title>`.

**Lỗi 6** — Dòng 9: `<h1>Welcome to ShopTLU<h1>` tag sai. Cách sửa: thay `<h1>...<h1>` thành `<h1>...</h1>`.

**Lỗi 7** — Dòng 14: `<a href="home">Trang chủ<a>` không đóng. Cách sửa: thay `<a>...<a>` thành `<a>...</a>`.

**Lỗi 8** — Dòng 17: `<img src=iphone.jpg>` thiếu quotes và alt. Cách sửa: thay `<img src=iphone.jpg>` thành `<img src="iphone.jpg" alt="iPhone 16 Pro">`.

**Lỗi 9** — Dòng 19: `<p>Giá: <b>25.990.000đ</p></b>` tag xen kẽ. Cách sửa: thay `<p>...<b>...</p></b>` thành `<p>...<strong>...</strong></p>`.

**Lỗi 10** — Dòng 23: `<table>` thiếu `<thead>` và `<tbody>`. Cách sửa: thêm `<thead>` cho hàng header, `<tbody>` cho dữ liệu.

**Lỗi 11** — Dòng 38: Hai `<main>` tag không hợp lệ. Cách sửa: sửa `<main>` thứ 2 thành `<aside>`.

**Lỗi 12** — Dòng 43: `<p>Copyright 2026` không đóng. Cách sửa: sửa `<p>Copyright 2026` thành `<p>&copy; 2026 ShopTLU</p>`.

**Phân loại lỗi:**

Lỗi Syntax (Cú pháp): 1, 4, 5, 6, 7, 8, 9, 12 — Sai cấu trúc tag, quotes, không đóng tag.

Lỗi Semantic (Ngữ nghĩa): 2, 3, 10, 11 — Sử dụng tag không phù hợp hoặc thiếu thuộc tính quan trọng.

Lỗi Best Practice (Thực hành tốt): 3, 4, 8 — Không tuân theo chuẩn HTML5.

File đã sửa: `debug.html` — Toàn bộ 12 lỗi đã được fix.

---

## PHẦN C — SUY LUẬN

### Câu C1 (10đ) — Thiết kế cấu trúc trang chi tiết sản phẩm

Cấu trúc HTML cho trang product detail gồm các thành phần chính:

**Header & Navigation** — Dùng `<header>` chứa logo và `<nav>` cho menu điều hướng. Navigation chính của website gồm Trang chủ, Danh sách sản phẩm, Liên hệ.

**Breadcrumb Navigation** — Dùng `<nav>` với `<ol>` (ordered list) vì breadcrumb có thứ tự từ root đến chi tiết. Gồm: Trang chủ > Điện thoại > iPhone > iPhone 16 Pro Max.

**Product Detail Section** — Dùng `<section>` để chứa toàn bộ thông tin chi tiết sản phẩm.

**Article** — Mỗi sản phẩm là một `<article>` độc lập.

**Product Images** — Dùng `<section>` để nhóm các hình ảnh. Ảnh chính dùng `<figure>` + `<figcaption>` để nhóm ảnh với mô tả. Ảnh phụ (thumbnail) dùng `<div>` để wrap vì chỉ là container CSS.

**Product Info** — Chứa tên sản phẩm (`<h1>`), đánh giá sao, giá, mô tả, table thông số kỹ thuật, nút mua.

**Description** — Dùng `<section>` để chứa mô tả sản phẩm, `<ul>` để liệt kê các tính năng không có thứ tự.

**Specs Table** — Dùng `<table>` vì dữ liệu có cấu trúc 2 chiều (thuộc tính → giá trị). Gồm thead (tiêu đề), tbody (dữ liệu).

**CTA Buttons** — Dùng `<div>` để wrap các nút vì không có semantic tag phù hợp.

**Reviews Section** — Chứa các đánh giá từ khách hàng, mỗi review là một `<article>` độc lập.

**Related Products** — Dùng `<aside>` vì đây là nội dung phụ, không phải nội dung chính.

**Footer** — Dùng `<footer>` để chứa thông tin cuối trang gồm Chính sách, Liên hệ, Copyright.

Mỗi thẻ semantic được chọn vì nó phản ánh đúng ý nghĩa của nội dung, giúp search engine và screen reader hiểu cấu trúc trang rõ ràng.

---

### Câu C2 (10đ) — So sánh & Tranh luận: DIV vs Semantic HTML

**Đồng nghiệp nói:** "Dùng `<div>` cho mọi thứ rồi thêm class là được, không cần semantic HTML. Tốn thời gian học thêm thẻ mới."

**Phản biện:**

Phát biểu này thiếu hiểu biết về tầm quan trọng của semantic HTML trong phát triển web hiện đại. Dù có vẻ tiết kiệm thời gian ban đầu, việc chỉ dùng `<div>` sẽ tạo ra nhiều vấn đề dài hạn.

**Lý do 1: SEO (Tối ưu hóa công cụ tìm kiếm)**

Google và các search engine khác sử dụng semantic HTML để hiểu cấu trúc trang web. Khi bạn dùng `<header>`, `<nav>`, `<article>`, `<main>`, search engine biết chính xác phần nào là tiêu đề, phần nào là nội dung chính, phần nào là menu. Nếu chỉ dùng `<div class="header">`, Google sẽ không nhận diện được, dẫn đến ranking thấp hơn trong kết quả tìm kiếm.

**Lý do 2: Accessibility (Khả năng truy cập cho người khuyết tật)**

Người dùng sử dụng screen reader (thiết bị đọc màn hình) để duyệt web khi bị mù. Screen reader nhận diện semantic tags để hiểu cấu trúc trang. Với `<div>` không có ngữ cảnh, người dùng sẽ nghe "div, div, div..." mà không hiểu đây là menu hay nội dung chính, làm trải nghiệm tệ hại.

**Ví dụ cụ thể:**

Khi dùng div, code trở thành:
```html
<div class="header">
    <div class="navigation">
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </div>
</div>
```

Khi dùng semantic, code trở thành:
```html
<header>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>
```

Screen reader sẽ nhận biết ngay đây là navigation chính, giúp người dùng dễ dàng điều hướng trang web.

**Trường hợp `<div>` vẫn phù hợp:**

Không phải lúc nào cũng có semantic tag phù hợp. Ví dụ khi tạo layout lưới chứa 4 product card, bạn dùng `<div class="product-grid">` để wrap chúng, rồi bên trong mỗi thẻ vẫn dùng `<article>` cho sản phẩm. Đây là hợp lý vì `<div>` ở đây chỉ là "container vô nghĩa" để CSS định dạng layout.

**Kết luận:**

Semantic HTML không "tốn thời gian" — nó là best practice nhằm giúp code dễ bảo trì, cải thiện SEO, và đảm bảo mọi người kể cả người khuyết tật đều có thể sử dụng website. Bạn nên học các semantic tags vì chúng là tiêu chuẩn của web hiện đại.

---

## PHẦN B4 — PHÂN TÍCH TRANG WEB THẬT

### Trang web phân tích: `shopee.vn`

#### Semantic HTML5 tags được sử dụng

Các semantic tags tìm thấy:

**`<header>`** — Chứa logo, navigation, thanh tìm kiếm ở phần trên cùng.

**`<nav>`** — Menu điều hướng chính gồm Trang chủ, Flash Sale, Danh mục sản phẩm, v.v.

**`<main>`** — Nội dung chính của trang gồm sản phẩm, khuyến mãi.

**`<article>`** — Mỗi sản phẩm hoặc khuyến mãi là một article độc lập.

**`<aside>`** — Sidebar chứa bộ lọc tìm kiếm, huyền mãi bên cạnh.

**`<footer>`** — Phần footer với thông tin công ty, chính sách, liên hệ.

**`<figure>` + `<figcaption>`** — Ảnh sản phẩm kèm mô tả.

#### Các thẻ không dùng đúng semantic

**`<div class="carousel">`** — Nên dùng `<section role="region" aria-label="featured-products">` thay vì div thuần vì carousel là khu vực quan trọng.

**`<div class="product-card">`** — Một số chỗ dùng div thay `<article>` cho các sản phẩm.

#### Table trên trang


Nội dung của table: Bảng so sánh các sản phẩm cùng loại (nếu có trang so sánh).

Cấu trúc: Có sử dụng `<thead>` (dòng tiêu đề cột), `<tbody>` (dữ liệu sản phẩm).

#### Form trên trang (ô tìm kiếm)


Form action và method: `action="/search"` — gửi yêu cầu tới endpoint `/search`. `method="GET"` — sử dụng HTTP GET nên từ khóa hiển thị trong URL.

Input types được dùng: `<input type="search">` cho ô tìm kiếm. `<input type="text">` cho trường text khác. `<button type="submit">` cho nút Tìm kiếm.

---
