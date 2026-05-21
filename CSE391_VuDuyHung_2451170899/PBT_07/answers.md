# GIẢI ĐÁP PHIẾU BÀI TẬP 07

## PHẦN A
### A1 (var/let/const)
- Đoạn 1: `undefined` (hoisting), `5`.
- Đoạn 2: `ReferenceError` (Do `let` nằm trong Temporal Dead Zone).
- Đoạn 3: `TypeError` (Gán lại giá trị cho `const`).
- Đoạn 4: `[1, 2, 3, 4]` (const object/array vẫn có thể thay đổi nội dung).
- Đoạn 5: "Trong block: 2", "Ngoài block: 1" (Scope của `let` là block-scoped).

### A2 (Data Types & Coercion)
- `typeof null`: "object"
- `typeof undefined`: "undefined"
- `typeof NaN`: "number"
- `"5" + 3`: "53" (String concatenation)
- `"5" - 3`: 2 (Numeric coercion)
- `"5" * "3"`: 15
- `true + true`: 2
- `[] + []`: ""
- `[] + {}`: "[object Object]"
- `{} + []`: 0 (Chrome console)

### A3 (So sánh)
- Nên dùng `===` để tránh ép kiểu ngầm định (Type Coercion) gây lỗi logic không mong muốn.

### A4 (Truthy & Falsy)
- Falsy: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
- Kết quả: A, C, D, G, H in ra màn hình. (B, E, F không in).

## PHẦN C - C1 (Debug)
Các lỗi:
1. `giaSauGiam = 0` (Dùng dấu `=` thay vì `===` trong if).
2. `tinhGiaGiamGia` truyền string "100000" vào nhưng không handle ép kiểu.
3. Vòng lặp `var i` trong `setTimeout` gây lỗi closure (tất cả in ra 5).
Cách sửa: Dùng `let i` trong vòng lặp.