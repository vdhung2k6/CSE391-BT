const galleryContainer = document.getElementById('galleryContainer');
const loader = document.getElementById('loader');
let page = 1;

async function fetchImages() {
    loader.style.display = 'block';
    try {
        // Sử dụng Picsum Photos API để lấy ảnh ngẫu nhiên
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=8`);
        if (!response.ok) throw new Error("Lỗi tải ảnh");
        const images = await response.json();
        
        images.forEach(img => {
            const col = document.createElement('div');
            col.className = 'col-md-3 gallery-item';
            col.innerHTML = `
                <img src="${img.download_url}" class="gallery-img shadow" alt="Random Image">
                <p class="small mt-2 text-muted">Tác giả: ${img.author}</p>
            `;
            galleryContainer.appendChild(col);
        });
        page++;
    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
}

// Lắng nghe sự kiện cuộn trang
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        if (loader.style.display !== 'block') {
            fetchImages();
        }
    }
});

// Load ban đầu
fetchImages();