function calculate(num1, operator, num2) {
    // Kiểm tra input không phải số
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return "Lỗi: Input không phải số";
    }

    switch (operator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": 
            if (num2 === 0) return "Lỗi: Không thể chia cho 0";
            return num1 / num2;
        case "%": return num1 % num2;
        case "**": return num1 ** num2;
        default: return `Lỗi: Operator '${operator}' không hợp lệ`;
    }
}

// Test
console.log(calculate(10, "+", 5));    // 15
console.log(calculate(10, "/", 0));    // "Lỗi: Không thể chia cho 0"
console.log(calculate(10, "^", 5));    // "Lỗi: Operator '^' không hợp lệ"
console.log(calculate("abc", "+", 5)); // "Lỗi: Input không phải số"
console.log(calculate(2, "**", 10));   // 1024