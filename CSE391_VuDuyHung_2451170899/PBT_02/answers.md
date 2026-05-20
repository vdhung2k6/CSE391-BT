# Câu Trả Lời - Phiếu Bài Tập 02: HTML5 Forms & Media

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — Input Types

10 input types khác nhau trong HTML5:

1. `type="email"` → Ô nhập text, tự kiểm tra có @, tí dấu . → Dùng cho form đăng ký, form liên hệ
2. `type="password"` → Ô nhập text bị che dấu (hiển thị dấu •) → Dùng cho form đăng nhập, đổi mật khẩu
3. `type="number"` → Ô nhập số, có nút up/down để tăng/giảm, tự kiểm tra giá trị số → Dùng cho số lượng sản phẩm, tuổi, giá
4. `type="tel"` → Ô nhập số điện thoại, bàn phím hiển thị số → Dùng cho form nhập SĐT liên lạc
5. `type="date"` → Bộ chọn ngày, hiển thị calendar → Dùng cho ngày sinh, ngày giao hàng, ngày yêu cầu
6. `type="time"` → Bộ chọn giờ phút → Dùng cho chọn giờ giao hàng, khung giờ hẹn
7. `type="url"` → Ô nhập URL, tự kiểm tra định dạng http:// hoặc https:// → Dùng cho form nhập website, blog
8. `type="search"` → Ô nhập tìm kiếm, hiển thị nút X để xóa → Dùng cho ô tìm kiếm sản phẩm
9. `type="range"` → Thanh kéo chọn giá trị trong khoảng → Dùng cho bộ lọc giá, đánh giá sao
10. `type="checkbox"` → Hộp tích chọn (multiple choice) → Dùng cho chọn nhiều loại sản phẩm, tích nhận điều khoản

---

### Câu A2 (5đ) — Validation Attributes

**Dự đoán trước khi test:**

1. `<input type="text" required value="">` → **Không được submit**, hiển thị thông báo "Vui lòng điền trường này"
   - **TẠI SAO:** Attribute `required` bắt buộc input không được để trống, giá trị rỗng (value="") không thỏa điều kiện

2. `<input type="email" value="abc">` → **Không được submit**, hiển thị "Vui lòng nhập địa chỉ email hợp lệ"
   - **TẠI SAO:** Type `email` tự động validate định dạng, "abc" không chứa @ nên không phải email hợp lệ

3. `<input type="number" min="1" max="10" value="15">` → **Không được submit**, hiển thị "Giá trị phải nhỏ hơn hoặc bằng 10"
   - **TẠI SAO:** Attribute `max="10"` giới hạn giá trị tối đa, nhập 15 vượt quá giới hạn

4. `<input type="text" pattern="[0-9]{10}" value="abc123">` → **Không được submit**, hiển thị "Định dạng không hợp lệ"
   - **TẠI SAO:** Pattern `[0-9]{10}` yêu cầu chính xác 10 chữ số, "abc123" chứa chữ cái và chỉ có 6 ký tự

5. `<input type="password" minlength="8" value="123">` → **Không được submit**, hiển thị "Vui lòng nhập ít nhất 8 ký tự"
   - **TẠI SAO:** Attribute `minlength="8"` yêu cầu tối thiểu 8 ký tự, "123" chỉ có 3 ký tự

---

### Câu A3 (5đ) — Accessibility

1. **Tại sao `<label for="email">` quan trọng cho screen reader?**
   - `<label for="email">` liên kết nhãn với input, khi screen reader đọc, nó sẽ nói: "Email, trường input"
   - Người dùng mù sẽ hiểu input này dùng để làm gì
   - Click vào label sẽ focus vào input tương ứng (tăng vùng click)

2. **Khi nào dùng `<fieldset>` + `<legend>`? Ví dụ cụ thể:**
   - Dùng khi form có nhiều nhóm input liên quan
   - Ví dụ: 
     - Nhóm "Thông tin cá nhân" (Họ tên, Email, SĐT)
     - Nhóm "Tài khoản" (Username, Password)
     - Nhóm "Địa chỉ giao hàng" (Tỉnh, Quận, Địa chỉ chi tiết)
   - Screen reader sẽ đọc legend trước, giúp người dùng hiểu nhóm input này liên quan đến cái gì

3. **`aria-label` dùng khi nào? Tại sao KHÔNG nên dùng khi đã có `<label>`?**
   - `aria-label` dùng khi không có text hiển thị nhưng vẫn cần nhãn (VD: nút icon chỉ có ⓘ)
   - Tại sao không dùng khi có `<label>`: Nếu dùng cả hai, screen reader có thể đọc cả hai lần gây nhầm lẫn
   - Ưu tiên: `<label>` > `aria-label` > `aria-describedby`

---

### Câu A4 (5đ) — Media

1. **Thuộc tính `loading="lazy"` trên thẻ `<img>`:**
   - **Làm gì:** Ảnh chỉ được load khi user scroll đến gần ảnh đó
   - **Cải thiện gì:** Tăng tốc độ load trang (lazy loading), giảm bandwidth không cần thiết
   - **Khi KHÔNG nên dùng:** Ảnh hero ở top page, ảnh logo, ảnh critical - những thứ user thấy ngay

2. **Tại sao cung cấp nhiều `<source>` trong `<video>`?**
   - Các browser hỗ trợ format video khác nhau (Safari ← mp4, Chrome ← webm, Firefox ← ogg)
   - Cung cấp nhiều format đảm bảo video chạy trên mọi browser
   - 3 format phổ biến: **mp4** (H.264), **webm** (VP8/VP9), **ogg** (Theora)

3. **Thuộc tính `alt` trên `<img>` dùng để:**
   - Mô tả ảnh cho screen reader (accessibility)
   - Hiển thị khi ảnh không load được (fallback text)
   - Giúp SEO - Google hiểu ảnh là gì
   
   **3 ví dụ `alt` tốt:**
   - Ảnh sản phẩm: `alt="iPhone 16 Pro Max 256GB Titan Blue màu xanh"`
   - Ảnh trang trí: `alt=""` (để trống, không cần mô tả ảnh trang trí vô nghĩa)
   - Ảnh biểu đồ doanh thu Q1: `alt="Biểu đồ doanh thu quý I 2026: tháng 1 đạt 500M, tháng 2 đạt 620M, tháng 3 đạt 750M"`

---

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`

**Khi nào dùng Cách 1 (`<img>`):**
- Ảnh đơn thuần không cần giải thích
- Ảnh background, icon, decorative
- Ví dụ: Logo website, ảnh trang trí, icon button

**Khi nào dùng Cách 2 (`<figure>` + `<figcaption>`):**
- Ảnh có ý nghĩa, cần chú thích bên dưới
- Ảnh sản phẩm với giá tiền, đánh giá sao
- Ảnh bài viết với caption, source, credit
- Ví dụ 1: Ảnh sản phẩm iPhone với giá + "iPhone 16 Pro Max — 25.990.000đ"
- Ví dụ 2: Ảnh timeline lịch sử với "Ngày 20/5 - Sự kiện lịch sử quan trọng"

---

## PHẦN C — PHÂN TÍCH & SUY LUẬN

### Câu C1 (10đ) — Debug Form

**8 lỗi tìm được:**

```
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 2: Dòng 2 — Input "Tên" không có required + placeholder + minlength/maxlength
Sửa: Thêm <input type="text" id="name" name="name" required minlength="2" maxlength="50" placeholder="Nhập tên của bạn">

Lỗi 3: Dòng 4 — Input "Email" không có <label> + id + name
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required placeholder="Email của bạn">

Lỗi 4: Dòng 6 — Input "Password" không có <label> + id + name
Sửa: <label for="pass">Mật khẩu:</label> <input type="password" id="pass" name="pass" required minlength="8" placeholder="Mật khẩu">

Lỗi 5: Dòng 7 — Input "Xác nhận password" không có <label> + id + name + minlength
Sửa: <label for="confirm-pass">Xác nhận mật khẩu:</label> <input type="password" id="confirm-pass" name="confirm-pass" required minlength="8" placeholder="Nhập lại mật khẩu">

Lỗi 6: Dòng 9 — Input "Phone" có type="text" thay vì type="tel" + không có pattern
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="0901234567">

Lỗi 7: Dòng 11 — Select "Tỉnh/Thành" không có <label> + id + name + required
Sửa: <label for="city">Tỉnh/Thành phố:</label> <select id="city" name="city" required> <option value="">Chọn tỉnh/thành</option> ...

Lỗi 8: Dòng 15 — Checkbox không liên kết với input (checkbox phải nằm bên trong <label> hoặc có for+id)
Sửa: <input type="checkbox" id="agree" name="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>
```

---

### Câu C2 (10đ) — Thiết kế chiến lược Validation

**1. Pattern Regex cho CMND/CCCD và Số tài khoản:**
```
CMND/CCCD (12 chữ số): pattern="[0-9]{12}"
Số tài khoản (10-15 chữ số): pattern="[0-9]{10,15}"
PIN (6 chữ số): pattern="[0-9]{6}"
```

**2. HTML5 validation có đủ an toàn cho ứng dụng ngân hàng không?**
- **Không, KHÔNG đủ an toàn!** Lý do:
  - HTML5 validation chỉ chạy trên Frontend, user có thể tắt JavaScript hoặc chỉnh sửa HTML
  - Hacker có thể bypass tất cả validation bằng Developer Tools (F12)
  - **PHẢI validate Backend** vì Backend có thể tin cậy hơn
  - Ngân hàng cần: HTML5 validation (UX) + Backend validation (security) + Encryption (HTTPS/SSL)

**3. 3 loại validation mà HTML5 KHÔNG thể làm (cần JavaScript):**
- **Kiểm tra unique:** Email đã tồn tại hay chưa trong database
- **Kiểm tra matching:** Mật khẩu nhập lại có giống mật khẩu lần đầu không
- **Kiểm tra logic phức tạp:** Nếu chọn giao hàng Express thì phí phải > 50k, nếu chọn thường thì phí = 0

**4. 2 rủi ro bảo mật nếu chỉ validate Frontend mà không validate Backend:**
- **Rủi ro 1: Bypass validation** — Hacker tắt JavaScript, chỉnh HTML/CSS, gửi request trực tiếp tới server mà không qua validation
- **Rủi ro 2: SQL Injection / XSS** — Nếu Backend không validate, hacker có thể gửi input chứa code độc hại (SQL queries, JavaScript) để tấn công

---

**LƯU Ý:** Tất cả câu trả lời đều được căn cứ vào các khái niệm HTML5 Forms & Media chuẩn W3C.
