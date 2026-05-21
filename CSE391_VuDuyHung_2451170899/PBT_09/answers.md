# PBT_09 - ANSWERS

## PHẦN A: KIỂM TRA ĐỌC HIỂU

### Câu A1: DOM Tree
1. **DOM Tree sơ lược:**
   - #app (div) -> header, main
   - header -> h1, nav (a, a, a)
   - main -> form (input, button), ul (li, li)

2. **Selectors:**
   - Thẻ `<h1>`: `document.querySelector('h1')`
   - Input trong form: `document.querySelector('#todoForm #todoInput')`
   - Tất cả `.todo-item`: `document.querySelectorAll('.todo-item')`
   - Link active: `document.querySelector('nav .active')`
   - `<li>` đầu tiên trong `#todoList`: `document.querySelector('#todoList li:first-child')`
   - Tất cả `<a>` trong `<nav>`: `document.querySelectorAll('nav a')`

### Câu A2: innerHTML vs textContent
- **textContent:** Chỉ lấy/gán text thuần túy. An toàn, hiệu suất tốt hơn vì không cần parse HTML.
- **innerHTML:** Lấy/gán nội dung bao gồm cả thẻ HTML. Có thể gây lỗi **XSS (Cross-Site Scripting)** nếu user nhập dữ liệu độc hại.
- **Ví dụ XSS:** User nhập `<img src=x onerror="alert('Hacked!')">`. Dùng `innerHTML` sẽ khiến trình duyệt cố load ảnh lỗi và thực thi đoạn script `alert`.
- **Cách sửa:** Luôn sử dụng `textContent` để gán dữ liệu người dùng. Nếu bắt buộc cần render HTML, hãy sử dụng thư viện sanitize (như DOMPurify) trước khi gán.

### Câu A3: Event Bubbling
- Thứ tự log: `BUTTON` -> `INNER` -> `OUTER`.
- Nếu `e.stopPropagation()`: Chỉ log `BUTTON`.

---

## PHẦN C: DEBUG & PHÂN TÍCH

### Câu C1: Sửa lỗi (7+ lỗi)
1. `addEventListener("onclick", ...)` -> sai event, sửa thành `"click"`.
2. `countDisplay.innerHTML = count` -> `countDisplay` là element, nên dùng `textContent = count`.
3. `countDisplay = count` (trong resetBtn) -> `countDisplay.textContent = 0`.
4. `historyList.innerHTML = null` -> dùng `historyList.innerHTML = ""` hoặc `replaceChildren()`.
5. `item.remove` -> thiếu dấu ngoặc `item.remove()`.
6. Load from local: `count` trả về string, cần `parseInt(localStorage.getItem("count"))`.
7. `beforeunload`: Nên lưu `JSON.stringify` hoặc xử lý mảng object thay vì lưu nguyên `innerHTML` của list (không bền vững).

### Câu C2: Performance
1. **Event Delegation:** Bind lên 1000 phần tử tốn tài nguyên bộ nhớ và gây chậm DOM. Thay vì thế, bind 1 event lên phần tử cha (`ul`), kiểm tra `e.target` để xác định con nào vừa click.
2. **DocumentFragment:** Dùng `const fragment = document.createDocumentFragment()` để append 1000 divs vào fragment trước (trong bộ nhớ), sau đó append fragment vào DOM 1 lần duy nhất.
   - **Tại sao nhanh:** Chỉ gây 1 lần **reflow/repaint** thay vì 1000 lần.