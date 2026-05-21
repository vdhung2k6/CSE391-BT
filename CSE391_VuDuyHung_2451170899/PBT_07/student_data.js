const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function getGrade(avg) {
    if (avg >= 8.0) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5.0) return "Trung bình";
    return "Yếu";
}

// 1, 2, 3: Tính TB, Xếp loại và In bảng
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

let counts = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
let minAvg = 10, maxAvg = 0;

students.forEach((s, index) => {
    let avg = (s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3).toFixed(1);
    let grade = getGrade(parseFloat(avg));
    counts[grade]++;
    if (avg < minAvg) minAvg = avg;
    if (avg > maxAvg) maxAvg = avg;

    console.log(`| ${index + 1}   | ${s.name.padEnd(6)} | ${avg} | ${grade.padEnd(11)} |`);
});

console.log("\nThống kê:", counts);
console.log(`Min: ${minAvg}, Max: ${maxAvg}`);

// 6. Điểm TB môn
let totalM = 0, totalP = 0, totalC = 0;
students.forEach(s => { totalM += s.math; totalP += s.physics; totalC += s.cs; });
console.log(`TB Môn: Math ${totalM/students.length}, Phys ${totalP/students.length}, CS ${totalC/students.length}`);