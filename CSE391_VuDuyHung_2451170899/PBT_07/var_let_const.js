// File kiểm chứng Câu A1

console.log("--- Đoạn 1 ---");
console.log(x); // Kết quả: undefined
var x = 5;

console.log("\n--- Đoạn 2 ---");
try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log("Lỗi: ReferenceError (Cannot access 'y' before initialization)");
}

console.log("\n--- Đoạn 3 ---");
try {
    const z = 15;
    z = 20; 
    console.log(z);
} catch (error) {
    console.log("Lỗi: TypeError (Assignment to constant variable)");
}

console.log("\n--- Đoạn 4 ---");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // Kết quả: [1, 2, 3, 4]

console.log("\n--- Đoạn 5 ---");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); // Kết quả: 2
}
console.log("Ngoài block:", a); // Kết quả: 1