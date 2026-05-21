// A1 - Test các behavior
// Đoạn 1
console.log("Đoạn 1:", x); // undefined
var x = 5;

// Đoạn 2
try {
    console.log(y); 
} catch(e) { console.log("Đoạn 2: Lỗi", e.message); }
let y = 10;

// Đoạn 3
try {
    const z = 15;
    z = 20;
} catch(e) { console.log("Đoạn 3: Lỗi", e.message); }

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log("Đoạn 4:", arr);

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Đoạn 5 - Trong block:", a);
}
console.log("Đoạn 5 - Ngoài block:", a);