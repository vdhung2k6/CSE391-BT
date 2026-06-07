document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherContainer = document.getElementById('weatherContainer');

    // Sự kiện khi click nút Tìm kiếm
    searchBtn.addEventListener('click', () => {
        const cityName = cityInput.value.trim();
        if (cityName) {
            getWeatherData(cityName);
        }
    });

    // Sự kiện khi nhấn phím Enter trong ô input
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cityName = cityInput.value.trim();
            if (cityName) {
                getWeatherData(cityName);
            }
        }
    });

    // Gọi mặc định khi tải trang
    getWeatherData('Hanoi');

    // Hàm gọi API bất đồng bộ xử lý thời tiết
    async function getWeatherData(city) {
        // 1. Trạng thái Đang tải (Loading State)
        renderLoading();

        try {
            // Bước A: Tìm tọa độ (lat, lon) từ tên thành phố qua Geocoding API công khai (Không cần API Key)
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en`;
            const geoResponse = await fetch(geoUrl);
            
            if (!geoResponse.ok) {
                throw new Error(`Lỗi kết nối máy chủ Geocoding (${geoResponse.status})`);
            }
            
            const geoData = await geoResponse.json();
            
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error(`Không tìm thấy dữ liệu vị trí cho thành phố "${city}"`);
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // Bước B: Lấy dữ liệu thời tiết thực tế dựa trên tọa độ vừa tìm được
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
            const weatherResponse = await fetch(weatherUrl);

            if (!weatherResponse.ok) {
                throw new Error(`Lỗi kết nối máy chủ dữ liệu thời tiết (${weatherResponse.status})`);
            }

            const weatherData = await weatherResponse.json();
            
            // 2. Trạng thái Thành công (Success State)
            renderSuccess(name, country, weatherData.current_weather);

        } catch (error) {
            // 3. Trạng thái Thất bại / Lỗi (Error State)
            renderError(error.message);
        }
    }

    // Hàm hiển thị giao diện khi đang tải dữ liệu
    function renderLoading() {
        weatherContainer.innerHTML = `
            <div class="card border-0 shadow-sm text-center p-5">
                <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-muted fw-semibold mb-0">⏳ Đang tải dữ liệu thời tiết mới nhất...</p>
            </div>
        `;
    }

    // Hàm hiển thị giao diện khi lấy dữ liệu thành công
    function renderSuccess(cityName, countryName, current) {
        const temp = current.temperature;
        const windSpeed = current.windspeed;
        const time = new Date(current.time).toLocaleString('vi-VN');
        const weatherCode = current.weathercode;

        // Phân loại icon và mô tả dựa trên mã thời tiết (Weather Code) của Open-Meteo
        let weatherIcon = 'bi-sun-fill text-warning';
        let weatherDesc = 'Trời quang đãng';

        if (weatherCode >= 1 && weatherCode <= 3) {
            weatherIcon = 'bi-cloud-sun-fill text-secondary';
            weatherDesc = 'Có mây rải rác';
        } else if (weatherCode >= 45 && weatherCode <= 48) {
            weatherIcon = 'bi-cloud-fog2-fill text-info';
            weatherDesc = 'Có sương mù';
        } else if (weatherCode >= 51 && weatherCode <= 67) {
            weatherIcon = 'bi-cloud-drizzle-fill text-primary';
            weatherDesc = 'Có mưa phùn / Mưa nhẹ';
        } else if (weatherCode >= 71 && weatherCode <= 77) {
            weatherIcon = 'bi-snow text-info';
            weatherDesc = 'Có tuyết rơi';
        } else if (weatherCode >= 80 && weatherCode <= 82) {
            weatherIcon = 'bi-cloud-rain-heavy-fill text-primary';
            weatherDesc = 'Mưa lớn thành đợt';
        } else if (weatherCode >= 95) {
            weatherIcon = 'bi-cloud-lightning-rain-fill text-danger';
            weatherDesc = 'Có dông bão';
        }

        weatherContainer.innerHTML = `
            <div class="card border-0 shadow-sm overflow-hidden animate-fade-in">
                <div class="card-body p-4 text-center">
                    <h3 class="fw-bold mb-1">${cityName}</h3>
                    <p class="text-muted small text-uppercase fw-semibold mb-3"><i class="bi bi-geo-alt-fill me-1"></i>${countryName}</p>
                    
                    <div class="my-4">
                        <i class="bi ${weatherIcon}" style="font-size: 4.5rem; display: block; line-height: 1;"></i>
                        <span class="display-3 fw-bold d-block mt-3">${temp}°C</span>
                        <span class="badge bg-light text-dark fs-6 border px-3 py-2 mt-2">${weatherDesc}</span>
                    </div>

                    <hr class="text-muted my-4">

                    <div class="row text-start">
                        <div class="col-6 border-end text-center">
                            <p class="text-muted mb-1 small"><i class="bi bi-wind me-1"></i> Tốc độ gió</p>
                            <h5 class="fw-bold mb-0">${windSpeed} km/h</h5>
                        </div>
                        <div class="col-6 text-center">
                            <p class="text-muted mb-1 small"><i class="bi bi-clock me-1"></i> Cập nhật lúc</p>
                            <h6 class="fw-bold mb-0 text-truncate" style="max-width: 100%;">${time}</h6>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Hàm hiển thị giao diện khi xảy ra lỗi
    function renderError(errorMessage) {
        weatherContainer.innerHTML = `
            <div class="alert alert-danger border-0 shadow-sm p-4 d-flex align-items-start mb-0" role="alert">
                <i class="bi bi-exclamation-triangle-fill fs-3 me-3"></i>
                <div>
                    <h5 class="alert-heading fw-bold mb-1">Đã xảy ra lỗi!</h5>
                    <p class="mb-0 text-secondary">${errorMessage}</p>
                    <p class="mb-0 small mt-2 text-muted">Mẹo: Hãy kiểm tra lại kết nối Internet hoặc chính tả tên thành phố (nên nhập bằng tiếng Anh không dấu).</p>
                </div>
            </div>
        `;
    }
});