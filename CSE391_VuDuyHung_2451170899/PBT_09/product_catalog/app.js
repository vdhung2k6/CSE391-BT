const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5 },
    { id: 2, name: "Samsung S24", price: 22000000, category: "phone", image: "https://placehold.co/200", rating: 4.8 },
    { id: 3, name: "MacBook Air", price: 28000000, category: "laptop", image: "https://placehold.co/200", rating: 4.9 },
    // Thêm các sản phẩm khác...
];

let cartCount = 0;
const grid = document.querySelector("#productGrid");

function renderProducts(data) {
    grid.innerHTML = "";
    data.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${p.name}</h3><p>${p.price.toLocaleString()}đ</p>`;
        div.onclick = () => showModal(p);
        grid.appendChild(div);
    });
}

function showModal(p) {
    const modal = document.querySelector("#modal");
    document.querySelector("#modalBody").innerHTML = `<h2>${p.name}</h2><button onclick="addToCart()">Thêm giỏ</button>`;
    modal.classList.remove("hidden");
}

document.querySelector("#darkModeToggle").onclick = () => document.body.classList.toggle("dark-mode");
document.querySelector("#closeModal").onclick = () => document.querySelector("#modal").classList.add("hidden");
function addToCart() { cartCount++; document.querySelector("#cartCount").textContent = cartCount; }

renderProducts(products);