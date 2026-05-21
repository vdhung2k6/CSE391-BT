# PHIẾU BÀI TẬP 06 — ANSWERS (TRACK A: BOOTSTRAP 5)

## PHẦN A — ĐỌC HIỂU

### Câu A1 — Grid System

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | Xếp chồng dọc (4 hàng) | 2 hàng, mỗi hàng 2 box | 1 hàng ngang chứa 4 box |

**Câu hỏi thêm:** - `col-md-6` nghĩa là phần tử sẽ chiếm 6/12 (tương đương 50%) chiều rộng của dòng (`row`) bắt đầu từ màn hình có kích thước trung bình (`md` - ≥ 768px) trở lên.
- Không cần viết `col-sm-12` vì class `col-12` đứng trước nó đã mặc định thiết lập phần tử chiếm 100% (12/12) cho tất cả các kích thước màn hình nhỏ nhất. Theo nguyên lý Mobile-First của Bootstrap, cấu hình này sẽ tự động áp dụng lên các breakpoint lớn hơn cho đến khi bị `col-md-6` ghi đè ở mốc 768px.

### Câu A2 — Utilities & Components

1. **Giải thích class `d-none d-md-block`:**
   - Element này sẽ bị **ẩn** trên màn hình Mobile (< 768px) do chịu tác dụng của `d-none` (display: none).
   - Element này sẽ **hiển thị** dưới dạng block trên màn hình Tablet và Desktop (≥ 768px) do `d-md-block` (display: block) ghi đè lại.

2. **5 spacing utilities:**
   - `mt-3`: Margin Top cỡ 3 (khoảng 1rem / 16px).
   - `px-4`: Padding trục X (Left và Right) cỡ 4 (khoảng 1.5rem / 24px).
   - `mb-auto`: Margin Bottom tự động (thường dùng trong Flexbox để đẩy phần tử khác ra xa).
   - `pt-5`: Padding Top cỡ 5 (khoảng 3rem / 48px).
   - `mx-auto`: Margin trục X tự động (dùng để căn giữa một khối block theo chiều ngang).

3. **Sự khác nhau giữa các loại Container:**
   - `.container`: Có chiều rộng tối đa (max-width) cố định thay đổi theo từng breakpoint và luôn căn giữa màn hình. 
   - `.container-fluid`: Luôn mở rộng tràn viền chiếm 100% chiều rộng của viewport ở tất cả mọi kích thước màn hình.
   - `.container-md`: Tràn viền 100% ở màn hình nhỏ (< 768px), nhưng từ màn hình `md` (≥ 768px) trở lên sẽ bắt đầu có max-width cố định giống `.container` bình thường.

---

## PHẦN C — PHÂN TÍCH

### Câu C1 — Tùy biến Bootstrap

1. **Quy trình đổi màu `$primary`:**
   - Công cụ cần thiết: Node.js, bộ biên dịch Sass (SASS compiler).
   - Quy trình: Thay vì dùng file CSS biên dịch sẵn, ta tạo một file SASS tùy chỉnh (VD: `custom.scss`). Trong file này, khai báo biến `$primary: #E63946;` **TRƯỚC** khi gọi lệnh `@import` mã nguồn SASS gốc của Bootstrap. Trình biên dịch sẽ đọc biến này và cập nhật lại toàn bộ framework.

2. **Tại sao KHÔNG NÊN override trực tiếp:**
   - Nếu chỉ viết `.btn-primary { background: red; }`, nút bấm sẽ bị lỗi hiển thị ở các trạng thái khác (như lúc hover, lúc focus viền sáng) và không đồng bộ với các class liên quan đến màu primary khác (như `text-primary`, `bg-primary`). Dùng biến SASS sẽ giúp Bootstrap tự động tính toán đồng bộ mọi trạng thái.

### Câu C2 — So sánh Bootstrap vs CSS thuần

1. **Số dòng CSS cần viết:** CSS thuần tốn hàng chục/trăm dòng cho Navbar/Card. Bootstrap tốn 0 dòng CSS (chỉ cần thêm class vào HTML).
2. **Thời gian phát triển:** Bootstrap cực kỳ nhanh do components đã dựng sẵn và chia responsive chuẩn. CSS thuần tốn thời gian code, căn chỉnh và test lỗi trên từng thiết bị.
3. **Khả năng tùy biến:** CSS thuần tự do 100%. Bootstrap sẽ hơi khó tùy biến sâu nếu không rành SASS, giao diện dễ bị rập khuôn giống các trang web khác.
4. **Khi nào NÊN và KHÔNG NÊN dùng Bootstrap?**
   - **NÊN:** Khi làm trang Admin Dashboard, Prototype chạy thử nghiệm, Landing page làm gấp, web nội bộ không yêu cầu thiết kế quá độc đáo.
   - **KHÔNG NÊN:** Khi dự án có bản thiết kế UI/UX độc quyền khắt khe, hoặc khi cần tối ưu dung lượng file CSS xuống mức thấp nhất (lúc này nên dùng TailwindCSS hoặc CSS thuần).