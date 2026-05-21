const secret = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 7;
const guessedNumbers = [];

alert("Chào mừng bạn đến với game đoán số! Hãy đoán một số từ 1 đến 100. Bạn có 7 lần thử.");

while (attempts < maxAttempts) {
    let input = prompt(`Lần đoán thứ ${attempts + 1}/${maxAttempts}. Nhập số của bạn:`);
    
    // Nếu người dùng nhấn Cancel
    if (input === null) break;

    let num = parseInt(input);

    // Validate
    if (isNaN(num) || num < 1 || num > 100) {
        alert("Vui lòng chỉ nhập số từ 1 đến 100!");
        continue;
    }

    // Kiểm tra trùng
    if (guessedNumbers.includes(num)) {
        alert("Bạn đã đoán số này rồi! Hãy thử số khác.");
        continue;
    }

    guessedNumbers.push(num);
    attempts++;

    // Logic game
    if (num === secret) {
        alert(`Chúc mừng! Bạn đã đoán đúng sau ${attempts} lần.`);
        break;
    } else if (attempts === maxAttempts) {
        alert(`Bạn đã hết lượt! Đáp án là ${secret}.`);
    } else if (num < secret) {
        alert("Số cần tìm cao hơn!");
    } else {
        alert("Số cần tìm thấp hơn!");
    }
}