function createCart() {
    // Private data: chỉ có thể truy cập qua các hàm được trả về
    let items = [];
    let appliedDiscount = 0; // Lưu tỷ lệ giảm giá (ví dụ: 0.1 cho 10%)
    let fixedDiscount = 0;   // Lưu giảm giá cố định (ví dụ: 30000)

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(i => i.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(i => i.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal() {
            let subTotal = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
            let total = subTotal * (1 - appliedDiscount) - fixedDiscount;
            return total > 0 ? total : 0;
        },

        applyDiscount(code) {
            if (code === "SALE10") appliedDiscount = 0.1;
            else if (code === "SALE20") appliedDiscount = 0.2;
            else if (code === "FREESHIP") fixedDiscount = 30000;
        },

        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            items.forEach((item, index) => {
                let rowTotal = item.price * item.quantity;
                console.log(`│ ${index + 1} │ ${item.name.padEnd(13)} │  ${item.quantity} │ ${item.price.toLocaleString().padEnd(10)} │ ${rowTotal.toLocaleString().padEnd(11)} │`);
            });
            console.log("├──────────────────────────────────────────────┤");
            console.log(`│ Tổng cộng:                       ${this.getTotal().toLocaleString()}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        },

        getItemCount() {
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },

        clearCart() {
            items = [];
            appliedDiscount = 0;
            fixedDiscount = 0;
        }
    };
}

// === TEST ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng SL lên 2

cart.printCart();
cart.applyDiscount("SALE10");
console.log("\nSau khi giảm giá 10%:");
cart.printCart();