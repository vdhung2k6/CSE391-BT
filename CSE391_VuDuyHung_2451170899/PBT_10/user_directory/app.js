// --- API LAYER ---
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error("Không thể tải danh sách");
        return await res.json();
    },
    
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        if (!res.ok) throw new Error("Lỗi khi tạo user");
        return await res.json();
    },
    
    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        if (!res.ok) throw new Error("Lỗi khi cập nhật");
        return await res.json();
    },
    
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error("Lỗi khi xóa");
        return true;
    }
};

// --- UI LAYER ---
const ui = {
    tableBody: document.getElementById('userTableBody'),
    userModal: new bootstrap.Modal(document.getElementById('userModal')),
    form: document.getElementById('userForm'),
    modalTitle: document.getElementById('modalTitle'),
    searchInput: document.getElementById('searchInput'),
    
    // Toast Notification
    toastEl: document.getElementById('liveToast'),
    toastMsg: document.getElementById('toastMessage'),

    showSkeleton() {
        let html = '';
        for(let i=0; i<5; i++) {
            html += `
            <tr class="skeleton-row">
                <td><div class="skeleton-box" style="width: 30px;"></div></td>
                <td><div class="skeleton-box" style="width: 150px;"></div></td>
                <td><div class="skeleton-box" style="width: 180px;"></div></td>
                <td><div class="skeleton-box" style="width: 120px;"></div></td>
                <td><div class="skeleton-box" style="width: 140px;"></div></td>
                <td><div class="skeleton-box" style="width: 80px; float:right;"></div></td>
            </tr>`;
        }
        this.tableBody.innerHTML = html;
    },

    renderUsers(users) {
        if(users.length === 0) {
            this.tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Không tìm thấy người dùng nào.</td></tr>`;
            return;
        }

        this.tableBody.innerHTML = users.map(user => `
            <tr>
                <td class="fw-bold text-secondary">#${user.id}</td>
                <td class="fw-semibold">${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone || 'N/A'}</td>
                <td>${user.company?.name || 'N/A'}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="app.editUser(${user.id})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="app.deleteUser(${user.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    },

    showToast(message, type = 'success') {
        this.toastMsg.textContent = message;
        this.toastEl.className = `toast align-items-center text-white border-0 bg-${type}`;
        const toast = new bootstrap.Toast(this.toastEl);
        toast.show();
    },

    setFormData(user = null) {
        if (user) {
            document.getElementById('userId').value = user.id;
            document.getElementById('nameInput').value = user.name;
            document.getElementById('emailInput').value = user.email;
            document.getElementById('phoneInput').value = user.phone || '';
            document.getElementById('companyInput').value = user.company?.name || '';
            this.modalTitle.textContent = "Cập nhật User";
        } else {
            this.form.reset();
            document.getElementById('userId').value = '';
            this.modalTitle.textContent = "Thêm User Mới";
        }
    }
};

// --- APP LOGIC ---
const app = {
    usersData: [],

    async init() {
        this.setupEventListeners();
        await this.loadUsers();
    },

    async loadUsers() {
        ui.showSkeleton();
        try {
            this.usersData = await api.getUsers();
            ui.renderUsers(this.usersData);
        } catch (error) {
            ui.showToast(error.message, 'danger');
            ui.tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-4">Lỗi tải dữ liệu. Vui lòng thử lại.</td></tr>`;
        }
    },

    setupEventListeners() {
        // Mở modal thêm mới
        document.getElementById('btnAddUser').addEventListener('click', () => {
            ui.setFormData(null);
        });

        // Xử lý Submit Form (Create / Update)
        ui.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSubmit = document.getElementById('saveBtn');
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang lưu...`;

            const id = document.getElementById('userId').value;
            const userData = {
                name: document.getElementById('nameInput').value,
                email: document.getElementById('emailInput').value,
                phone: document.getElementById('phoneInput').value,
                company: { name: document.getElementById('companyInput').value }
            };

            try {
                if (id) {
                    // Update
                    const updatedUser = await api.updateUser(id, userData);
                    // Giả lập cập nhật state nội bộ (vì API giả không lưu thật)
                    const index = this.usersData.findIndex(u => u.id == id);
                    this.usersData[index] = { ...this.usersData[index], ...updatedUser };
                    ui.showToast("Cập nhật thành công!");
                } else {
                    // Create
                    const newUser = await api.createUser(userData);
                    // Tạo ID giả (vì JSONPlaceholder luôn trả về id 11)
                    newUser.id = Date.now().toString().slice(-4); 
                    this.usersData.unshift(newUser);
                    ui.showToast("Thêm mới thành công!");
                }
                
                ui.renderUsers(this.usersData);
                ui.userModal.hide();
            } catch (error) {
                ui.showToast(error.message, 'danger');
            } finally {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = "Lưu thông tin";
            }
        });

        // Client-side Search Filter
        ui.searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = this.usersData.filter(user => 
                user.name.toLowerCase().includes(term) || 
                user.email.toLowerCase().includes(term)
            );
            ui.renderUsers(filtered);
        });
    },

    // Được gọi từ HTML (onclick)
    editUser(id) {
        const user = this.usersData.find(u => u.id == id);
        if (user) {
            ui.setFormData(user);
            ui.userModal.show();
        }
    },

    async deleteUser(id) {
        if (confirm("Bạn có chắc chắn muốn xóa user này không?")) {
            try {
                await api.deleteUser(id);
                this.usersData = this.usersData.filter(u => u.id != id);
                ui.renderUsers(this.usersData);
                ui.showToast("Đã xóa thành công!");
            } catch (error) {
                ui.showToast(error.message, 'danger');
            }
        }
    }
};

// Khởi chạy App
document.addEventListener('DOMContentLoaded', () => app.init());