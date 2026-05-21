# PHIẾU BÀI TẬP 07 — ANSWERS

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — var / let / const
*(Đã viết code kiểm chứng trong file `var_let_const.js`)*
- **Đoạn 1:** In ra `undefined` do cơ chế Hoisting của `var`. Biến được đưa lên đầu phạm vi nhưng chưa được gán giá trị.
- **Đoạn 2:** Lỗi `ReferenceError` vì `let` không cho phép sử dụng biến trước khi khởi tạo (Nằm trong vùng Temporal Dead Zone - TDZ).
- **Đoạn 3:** Lỗi `TypeError` vì không thể gán lại giá trị cho hằng số `const`.
- **Đoạn 4:** In ra `[1, 2, 3, 4]`. Khai báo `const` với mảng/object chỉ cấm việc gán lại biến bằng một mảng/object mới hoàn toàn, nhưng vẫn cho phép thay đổi, thêm bớt phần tử bên trong nó.
- **Đoạn 5:** In ra "Trong block: 2" và "Ngoài block: 1". `let` có phạm vi block scope, biến `a` bên trong `{}` là một biến độc lập, không ảnh hưởng đến biến `a` bên ngoài.

### Câu A2 — Data Types & Coercion
- `typeof null` → `"object"` (Đây là một lỗi lịch sử của JS được giữ lại để tránh làm hỏng các web cũ).
- `typeof undefined` → `"undefined"`
- `typeof NaN` → `"number"`
- `"5" + 3` → `"53"` (Dấu `+` ưu tiên nối chuỗi khi có toán hạng là string).
- `"5" - 3` → `2` (Dấu `-` luôn ép kiểu chuỗi thành số để tính toán toán học).
- `"5" * "3"` → `15` (Dấu `*` ép kiểu chuỗi thành số).
- `true + true` → `2` (Boolean `true` ép kiểu thành 1).
- `[] + []` → `""` (Mảng rỗng ép kiểu thành chuỗi rỗng).
- `[] + {}` → `"[object Object]"`
- `{} + []` → `0` hoặc `"[object Object]"` (Tuỳ môi trường thực thi).

### Câu A3 — So sánh == vs ===
- `5 == "5"` → `true`
- `5 === "5"` → `false`
- `null == undefined` → `true`
- `null === undefined` → `false`
- `NaN == NaN` → `false` (NaN không bao giờ bằng chính nó).
- `0 == false` → `true`
- `0 === false` → `false`
- `"" == false` → `true`

**Quy tắc:** Từ giờ trở đi luôn luôn sử dụng `===` (Strict equality). Tại vì `===` kiểm tra cả giá trị lẫn kiểu dữ liệu, giúp tránh các lỗi ép kiểu ngầm định (Type Coercion) lộn xộn của `==`.

### Câu A4 — Truthy & Falsy
- **Các giá trị Falsy trong JS:** `false`, `0`, `-0`, `0n`, `""` (chuỗi rỗng), `null`, `undefined`, `NaN`.
- `if ("0")` → **In** (Chuỗi có ký tự là Truthy)
- `if ("")` → **Không in** (Chuỗi rỗng là Falsy)
- `if ([])` → **In** (Mảng rỗng là Truthy)
- `if ({})` → **In** (Object rỗng là Truthy)
- `if (null)` → **Không in** (Falsy)
- `if (0)` → **Không in** (Falsy)
- `if (-1)` → **In** (Số khác 0 là Truthy)
- `if (" ")` → **In** (Chuỗi chứa khoảng trắng là Truthy)

### Câu A5 — Template Literals
```javascript
// Cách 1:
let greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
let url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
let html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;