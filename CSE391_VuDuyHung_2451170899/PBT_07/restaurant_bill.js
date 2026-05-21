function calculateBill(items, isWednesday) {
    let subTotal = 0;
    console.log("╔══════════════════════════════════════╗");
    console.log("║        HÓA ĐƠN NHÀ HÀNG           ║");
    console.log("╠══════════════════════════════════════╣");
    
    items.forEach((item, i) => {
        let lineTotal = item.price * item.qty;
        subTotal += lineTotal;
        console.log(`║ ${i+1}. ${item.name.padEnd(8)} x${item.qty}    @${item.price}k  = ${lineTotal}k  ║`);
    });

    let discountPercent = subTotal > 1000 ? 0.15 : (subTotal > 500 ? 0.10 : 0);
    if (isWednesday) discountPercent += 0.05;
    
    let discountAmount = subTotal * discountPercent;
    let afterDiscount = subTotal - discountAmount;
    let vat = afterDiscount * 0.08;
    let tip = afterDiscount * 0.05;
    let total = afterDiscount + vat + tip;

    console.log("╠══════════════════════════════════════╣");
    console.log(`║ Tổng cộng:              ${subTotal.toLocaleString()}k    ║`);
    console.log(`║ Giảm giá (${(discountPercent*100).toFixed(0)}%):           ${discountAmount.toLocaleString()}k         ║`);
    console.log(`║ VAT (8%):                ${vat.toLocaleString()}k    ║`);
    console.log(`║ Tip (5%):                ${tip.toLocaleString()}k    ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:              ${Math.round(total).toLocaleString()}k   ║`);
    console.log("╚══════════════════════════════════════╝");
}

calculateBill([
    { name: "Phở bò", qty: 2, price: 65 },
    { name: "Trà đá", qty: 3, price: 5 },
    { name: "Bún chả", qty: 1, price: 55 }
], false);