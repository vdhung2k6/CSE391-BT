# PHIẾU BÀI TẬP 10: ASYNC JAVASCRIPT & API INTEGRATION
## ĐÁP ÁN PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — Sync vs Async

#### 1. Dự đoán thứ tự hiển thị (Output)
```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

#### 2. Giải thích cơ chế Event Loop, Microtask Queue, Macrotask Queue
* **Call Stack & Đồng bộ (Sync):** Khi chương trình chạy, các dòng lệnh đồng bộ (`console.log`) sẽ được đưa thẳng vào Call Stack để thực thi ngay lập tức. Do đó, `1 - Start` và `4 - End` xuất hiện đầu tiên.
* **Macrotask Queue (Hàng đợi tác vụ lớn):** Các hàm như `setTimeout`, `setInterval` thuộc về Web APIs. Khi hết thời gian chờ, callback của chúng được đưa vào Macrotask Queue. Ở đây ta có `Timeout 0ms` (Macrotask 1) và `Timeout 100ms` (Macrotask 2).
* **Microtask Queue (Hàng đợi tác vụ nhỏ):** Các phản hồi từ `Promise.resolve().then()` hay `queueMicrotask` được đưa vào Microtask Queue. Hàng đợi này có **độ ưu tiên cao hơn** Macrotask Queue.
* **Luồng chạy của Event Loop:**
    1.  Thực thi hết các mã nguồn đồng bộ trong Call Stack.
    2.  Kiểm tra Microtask Queue. Nếu có tác vụ, thực thi **toàn bộ** cho đến khi Microtask Queue trống rỗng. Do đó, callback in ra `3 - Promise` và `6 - Promise 2` được thực thi liên tiếp.
    3.  Trong quá trình chạy `Promise 2`, một `setTimeout` 0ms lồng bên trong được đẩy vào cuối Macrotask Queue (đây là Macrotask 3).
    4.  Khi Microtask Queue trống, Event Loop lấy tác vụ đầu tiên trong Macrotask Queue ra chạy, đó là `2 - Timeout 0ms`. Tiếp theo, lấy Macrotask 3 ra chạy, in ra `7 - Nested timeout`. Cuối cùng, sau khi đủ 100ms, Macrotask 2 được xử lý và in ra `5 - Timeout 100ms`.

---

### Câu A2 — Fetch API

Giải thích chi tiết đoạn code mẫu:

1.  **`await fetch("https://api.example.com/data")`:**
    * Hàm `fetch()` gửi một yêu cầu HTTP request tới URL và trả về một **`Promise`** chứa đối tượng `Response` (bao gồm HTTP headers, status,... nhưng chưa có body dữ liệu).
    * Từ khóa `await` dùng để tạm dừng luồng thực thi của hàm `async function`, đợi cho đến khi `Promise` của `fetch()` được giải quyết (resolve). Giúp viết code bất đồng bộ nhìn giống như đồng bộ, tránh việc phải dùng nhiều hàm `.then()`.
2.  **`response.ok`:**
    * Đây là một thuộc tính kiểu Boolean của đối tượng `Response`. Nó sẽ mang giá trị `false` nếu HTTP status code của phản hồi nằm ngoài khoảng `200 - 299` (tức là yêu cầu thất bại ở phía server hoặc không tìm thấy trang).
    * **3 status codes tương ứng khiến `response.ok` bằng `false`:**
        * `404` (Not Found) - Không tìm thấy tài nguyên.
        * `500` (Internal Server Error) - Máy chủ gặp lỗi xử lý bên trong.
        * `429` (Too Many Requests) - Người dùng gửi quá nhiều yêu cầu trong thời gian ngắn bị giới hạn.
3.  **`await response.json()`:**
    * Phương thức `response.json()` đọc toàn bộ luồng dữ liệu (body stream) từ phản hồi và chuyển đổi (parse) chuỗi đó thành một đối tượng JavaScript.
    * Quá trình đọc và parse dữ liệu này là một tiến trình bất đồng bộ (vì luồng dữ liệu có thể đang tiếp tục truyền tải qua mạng), do đó nó trả về một `Promise`. Chúng ta cần từ khóa `await` lần nữa để đợi quá trình này hoàn tất và nhận về dữ liệu JSON dạng object/array hoàn chỉnh.
4.  **`try...catch`:**
    * Khối lệnh này dùng để bắt và xử lý các ngoại lệ (errors) có thể xảy ra trong khối `try`.
    * **Các loại lỗi cụ thể mà cấu trúc này sẽ bắt được:**
        * **Lỗi mạng (Network Error):** Khi mất kết nối internet, sai DNS, hoặc lỗi CORS, hàm `fetch()` sẽ lập tức từ chối (reject) và ném ra lỗi `TypeError`.
        * **Lỗi phản hồi không hợp lệ (HTTP Error do ta chủ động ném):** Khi `!response.ok` đúng (như lỗi 404, 500), dòng code `throw new Error(...)` sẽ chủ động kích hoạt và đẩy luồng xử lý xuống khối `catch`.
        * **Lỗi phân tích cú pháp (JSON Parse Error):** Nếu API trả về dữ liệu không phải định dạng JSON hợp lệ (ví dụ trả về một file HTML báo lỗi hoặc chuỗi text trống), phương thức `response.json()` sẽ ném lỗi cú pháp, khối `catch` sẽ bắt được lỗi này.

---

### Câu A3 — Promise States

#### 1. Sơ đồ 3 trạng thái của Promise
```
                  +-------------------------+
                  |         PENDING         |
                  |  (Trạng thái chờ đợi)   |
                  +-------------------------+
                    /                     \
     Nếu gọi resolve()                   Nếu gọi reject()
                  /                         \
                 v                           v
    +-------------------------+   +-------------------------+
    |        FULFILLED        |   |        REJECTED         |
    | (Thành công - Có value) |   | (Thất bại - Có error)   |
    +-------------------------+   +-------------------------+
```

#### 2. Định nghĩa Callback Hell
**Callback Hell** (hay còn gọi là *Pyramid of Doom*) là hiện tượng các hàm bất đồng bộ sử dụng callback lồng nhau quá nhiều cấp. Việc này khiến cho mã nguồn bị phát triển theo chiều ngang (hình tam giác thụt lề vào trong), làm cho code trở nên cực kỳ rối rắm, rất khó đọc, khó bảo trì, và việc quản lý, bắt lỗi (error handling) trở thành một cơn ác mộng.

#### 3. Ví dụ Callback Hell (4 cấp)
```javascript
// Giả định kịch bản chuẩn bị món ăn ăn tối
setTimeout(() => {
    console.log("Cấp 1: Đang đi chợ mua nguyên liệu...");
    setTimeout(() => {
        console.log("Cấp 2: Đang sơ chế và rửa rau củ...");
        setTimeout(() => {
            console.log("Cấp 3: Đang nấu thức ăn trên bếp...");
            setTimeout(() => {
                console.log("Cấp 4: Món ăn đã sẵn sàng! Dọn ra bàn ăn.");
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);
```

#### 4. Refactor cấu trúc trên sử dụng Async/Await
```javascript
// Tạo một hàm helper trả về Promise để cấu trúc thời gian delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function chuẩnBịBữaĂn() {
    try {
        await delay(1000);
        console.log("Bước 1: Đang đi chợ mua nguyên liệu...");
        
        await delay(1000);
        console.log("Bước 2: Đang sơ chế và rửa rau củ...");
        
        await delay(1000);
        console.log("Bước 3: Đang nấu thức ăn trên bếp...");
        
        await delay(1000);
        console.log("Bước 4: Món ăn đã sẵn sàng! Dọn ra bàn ăn.");
    } catch (error) {
        console.error("Quá trình chuẩn bị bữa ăn gặp lỗi:", error);
    }
}

chuẩnBịBữaĂn();
```

---

## ĐÁP ÁN PHẦN C — PHÂN TÍCH

### Câu C1 — Error Handling Strategy

Khi xây dựng một ứng dụng thương mại điện tử (E-Commerce) quy mô lớn gọi nhiều API đồng thời, chiến lược xử lý lỗi cần được phân tách tường minh như sau:

#### 1. Xử lý Network Errors (Mất kết nối mạng giữa chừng)
* **Giải pháp:** Khi mất mạng, `fetch` sẽ tự động reject. Ta cần bắt lỗi này trong khối `catch`, nhận biết thông qua `navigator.onLine` hoặc thông báo chung để hiển thị giao diện thông báo trực quan (ví dụ: một Banner/Toast "Mất kết nối Internet. Vui lòng kiểm tra Wi-Fi/4G"). Đồng thời, vô hiệu hóa các nút bấm gửi đơn hàng để tránh xung đột dữ liệu.

#### 2. Xử lý API Errors cụ thể
* **Server lỗi 500 (Internal Server Error):** Hiển thị thông báo nhẹ nhàng cho khách hàng: *"Hệ thống đang quá tải hoặc bảo trì, vui lòng thử lại sau vài phút"*, tránh hiển thị lỗi code thô ráp làm giảm trải nghiệm người dùng.
* **Lỗi 404 (Not Found):** Thường xảy ra khi người dùng xem một sản phẩm đã bị xóa hoặc sai ID. Cần chuyển hướng người dùng về trang danh mục sản phẩm hoặc hiện thông báo *"Sản phẩm này hiện không tồn tại"*.
* **Lỗi 429 (Too Many Requests):** Do người dùng hoặc tool spam request liên tục. Cần tạm thời khóa hành động click (deounce/throttle), hiển thị thông báo yêu cầu chờ đợi kèm đếm ngược thời gian: *"Bạn thao tác quá nhanh, vui lòng đợi [X] giây trước khi tiếp tục"*.

#### 3. Viết mã nguồn hàm `fetchWithTimeout(url, ms)`
Sử dụng `AbortController` để hủy bỏ request nếu phản hồi từ API vượt quá thời gian quy định.
```javascript
async function fetchWithTimeout(url, ms = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), ms);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id); // Xóa bộ đếm nếu fetch hoàn thành kịp thời
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error(`API Request Timeout sau ${ms}ms`);
        }
        throw error;
    }
}
```

#### 4. Viết mã nguồn hàm `fetchWithRetry(url, maxRetries)`
Tự động gọi lại API nếu gặp lỗi kết nối mạng, áp dụng thuật toán trì hoãn tăng dần (exponential backoff) để tránh làm nghẽn server.
```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP Error Status: ${response.status}`);
            }
            return await response.json(); // Thành công thì return luôn
        } catch (error) {
            const isLastRetry = i === maxRetries - 1;
            if (isLastRetry) {
                throw new Error(`Đã thử lại ${maxRetries} lần nhưng vẫn thất bại: ${error.message}`);
            }
            // Thời gian chờ tăng dần: lần 1 chờ 1s, lần 2 chờ 2s, lần 3 chờ 3s...
            const delayTime = (i + 1) * 1000;
            console.warn(`Lỗi fetch dòng sản phẩm, đang thử lại lần ${i + 1}/${maxRetries} sau ${delayTime}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delayTime));
        }
    }
}
```

---

### Câu C2 — Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

#### 1. Bảng so sánh toàn diện các phương thức xử lý Promise hàng loạt

| Method | Khi nào resolve? | Khi nào reject? | Use case thực tế thích hợp |
| :--- | :--- | :--- | :--- |
| **`Promise.all()`** | Khi **tất cả** các Promise truyền vào đều thành công (`fulfilled`). Trả về mảng kết quả theo đúng thứ tự. | Chỉ cần **một** Promise bất kỳ bị thất bại (`rejected`). Sẽ hủy ngang và trả về lỗi của Promise lỗi đầu tiên đó. | Khi các API phụ thuộc lẫn nhau. Ví dụ: Trang thanh toán cần nạp thông tin Giỏ hàng VÀ thông tin Số dư ví điện tử đồng thời, thiếu 1 trong 2 thì không thể bấm thanh toán. |
| **`Promise.allSettled()`** | Khi **tất cả** các Promise đều **đã chạy xong hoàn toàn** (không quan trọng là thành công hay thất bại). Luôn trả về mảng object mô tả trạng thái từng phần. | **Không bao giờ bị reject.** | Khi xây dựng trang Dashboard tổng hợp đa thành phần độc lập (Thời tiết, Tin tức, Tỷ giá). Thành phần nào lỗi thì hiện thông báo lỗi riêng tại widget đó, các widget khác vẫn tải bình thường. |
| **`Promise.race()`** | Khi có **một** Promise đầu tiên trong mảng chạy xong sớm nhất (dù là `fulfilled` hay `rejected`). | Khi Promise về đích đầu tiên là một Promise thất bại (`rejected`). | Dùng để làm cơ chế giới hạn thời gian phản hồi (Request Timeout) cho các API quan trọng. Chạy đua giữa việc gọi dữ liệu thật và một hàm đếm ngược báo lỗi timeout. |
| **`Promise.any()`** | Khi có **một** Promise đầu tiên trong mảng thành công (`fulfilled`). Lấy kết quả nhanh nhất đó. | Khi **tất cả** các Promise truyền vào đều thất bại (`rejected`). Trả về một `AggregateError`. | Gọi dữ liệu từ hệ thống nhiều máy chủ dự phòng (API Mirror CDNs). Gọi đồng thời đến Server Việt Nam, Singapore, Mỹ, server nào phản hồi thành công nhanh nhất thì lấy kết quả của server đó. |

#### 2. Kịch bản code thực tế minh họa từng phương thức

```javascript
// Giả lập các hàm gọi API thực tế của hệ thống thương mại điện tử
const fetchUserProfile = () => fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json());
const fetchUserCart = () => fetch("https://jsonplaceholder.typicode.com/carts/1").then(r => r.json());
const fetchPromotionBanner = () => fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => r.json());
const fetchExchangeRates = () => fetch("https://api.exchangerate-api.com/v4/latest/USD").then(r => r.json());
const fetchServerMirrorA = () => fetch("https://jsonplaceholder.typicode.com/photos/1").then(r => r.json());
const fetchServerMirrorB = () => fetch("https://jsonplaceholder.typicode.com/photos/2").then(r => r.json());

// 1. Minh họa Promise.all: Tải trang chi tiết thanh toán bắt buộc có đủ Profile + Giỏ hàng
async function loadCheckoutPage() {
    try {
        console.log("--- Khởi chạy Promise.all ---");
        const [profile, cart] = await Promise.all([fetchUserProfile(), fetchUserCart()]);
        console.log("Thành công tải trang thanh toán!", { profile, cart });
    } catch (error) {
        console.error("Lỗi nghiêm trọng, không thể tiếp tục thanh toán:", error.message);
    }
}

// 2. Minh họa Promise.allSettled: Tải trang Dashboard chứa thông tin Quảng cáo và Tỷ giá
async function loadDashboardData() {
    console.log("--- Khởi chạy Promise.allSettled ---");
    const results = await Promise.allSettled([fetchPromotionBanner(), fetchExchangeRates()]);
    
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Widget ${index + 1} tải thành công dữ liệu:`, result.value);
        } else {
            console.error(`Widget ${index + 1} tải thất bại. Nguyên nhân:`, result.reason);
        }
    });
}

// 3. Minh họa Promise.race: Giới hạn thời gian gọi giỏ hàng quá 3 giây sẽ báo lỗi hủy bỏ
async function loadCartWithTimeout() {
    console.log("--- Khởi chạy Promise.race ---");
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Yêu cầu quá hạn thời gian xử lý (Timeout)!")), 3000)
    );
    
    try {
        const fastestResult = await Promise.race([fetchUserCart(), timeoutPromise]);
        console.log("Lấy dữ liệu giỏ hàng thành công trước khi quá hạn:", fastestResult);
    } catch (error) {
        console.error("Kết quả đua thất bại:", error.message);
    }
}

// 4. Minh họa Promise.any: Tải ảnh sản phẩm từ hệ thống CDN dự phòng đa kênh
async function loadImageFromMultipleMirrors() {
    console.log("--- Khởi chạy Promise.any ---");
    try {
        const fastestSuccessfulData = await Promise.any([
            fetchServerMirrorA(),
            fetchServerMirrorB()
        ]);
        console.log("Đã lấy được dữ liệu ảnh từ server nhanh nhất:", fastestSuccessfulData);
    } catch (error) {
        console.error("Tất cả các server CDN dự phòng đều không phản hồi:", error.errors);
    }
}