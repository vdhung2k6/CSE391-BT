# GIẢI ĐÁP PBT 08

## PHẦN A
### A1: Function Types
- Hoisting: Function Declaration được hoist toàn bộ, trong khi Function Expression và Arrow Function chỉ hoist biến (var) hoặc nằm trong TDZ (let/const).

### A2: Scope & Closure
- `var` trong vòng lặp tạo ra closure chia sẻ cùng 1 biến `i`, nên sau khi loop kết thúc, `i` là 3.
- `let` tạo ra block scope mới cho mỗi lần lặp, giữ đúng giá trị của `j` tại thời điểm đó.

### A3: Array Methods
1. `nums.filter(x => x % 2 === 0)`
2. `nums.map(x => x * 3)`
3. `nums.reduce((sum, x) => sum + x, 0)`
4. `nums.find(x => x > 7)`
5. `nums.some(x => x > 10)`
6. `nums.every(x => x > 0)`
7. `nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`)`
8. `[...nums].reverse()`

### A4: Destructuring & Spread
- Destructuring: `name="iPhone 16", price=25990000, ram=8, color="Titan"`. `specs` sẽ báo lỗi (ReferenceError) vì đã được destructure bên trong.
- Spread: `updated.price` là 23990000. `product.price` không đổi (immutable update).
- Copy: `product.specs.ram` trở thành 16 (vì spread chỉ copy shallow, đối tượng `specs` vẫn tham chiếu đến cùng ô nhớ).

---

## PHẦN C — SUY LUẬN

### C1 (Refactor code)
const processOrders = (orders) => 
    orders.filter(o => o.status === "completed" && o.total > 100000)
          .map(({ id, customer, total }) => ({ id, customer, total, discount: total * 0.1, finalTotal: total * 0.9 }))
          .sort((a, b) => b.finalTotal - a.finalTotal);

### C2 (Mini Array Implementation)
const miniArray = {
    map: (arr, fn) => arr.reduce((acc, curr, i) => [...acc, fn(curr, i, arr)], []),
    filter: (arr, fn) => arr.reduce((acc, curr, i) => fn(curr, i, arr) ? [...acc, curr] : acc, []),
    reduce: (arr, fn, init) => {
        let acc = init !== undefined ? init : arr[0];
        for (let i = init !== undefined ? 0 : 1; i < arr.length; i++) acc = fn(acc, arr[i], i, arr);
        return acc;
    }
};