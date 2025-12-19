
        const weatherComponent = document.getElementById('weatherComponent');

        async function fetchWeather() {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia/Bangkok'
                );
                
                if (!response.ok) throw new Error('Không thể lấy dữ liệu thời tiết');
                
                const data = await response.json();
                const weather = {
                    temperature: Math.round(data.current.temperature_2m),
                    humidity: data.current.relative_humidity_2m,
                    windSpeed: data.current.wind_speed_10m,
                    weatherCode: data.current.weather_code,
                    location: 'Hà Nội, Việt Nam'
                };
                
                renderWeather(weather);
            } catch (error) {
                weatherComponent.innerHTML = `
                    <div style="background: #fee; border: 1px solid #fcc; border-radius: 16px; padding: 32px; text-align: center;">
                        <p style="color: #c00; margin-bottom: 16px;">⚠️ ${error.message}</p>
                        <button onclick="fetchWeather()" style="padding: 8px 24px; background: #c00; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Thử lại
                        </button>
                    </div>
                `;
            }
        }

        function getWeatherIcon(code) {
            if (code === 0) return '☀️';
            if (code >= 1 && code <= 3) return '☁️';
            if (code >= 51 && code <= 67) return '🌧️';
            return '☁️';
        }

        function getWeatherDescription(code) {
            if (code === 0) return 'Trời quang';
            if (code === 1) return 'Ít mây';
            if (code === 2) return 'Nhiều mây';
            if (code === 3) return 'U ám';
            if (code >= 51 && code <= 67) return 'Mưa';
            return 'Nhiều mây';
        }

        function getCurrentDate() {
            const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            const now = new Date();
            return `${days[now.getDay()]}, ${now.getDate()}/${months[now.getMonth()]}/${now.getFullYear()}`;
        }

        function getWeatherNote(weather) {
            if (weather.temperature > 30) {
                return 'Trời nóng! Nhớ mang nước và kem chống nắng khi đến nhà chung nhé! 🌞';
            }
            if (weather.weatherCode >= 51) {
                return 'Có mưa! Đừng quên mang áo mưa khi đến chăm sóc các bé nhé! ☔';
            }
            return 'Thời tiết đẹp! Ngày tuyệt vời để đến thăm các bé! 🐾';
        }

        function renderWeather(weather) {
            weatherComponent.innerHTML = `
                <div class="weather-card">
                    <div class="weather-header">
                        <h2>📍 ${weather.location}</h2>
                        <p>📅 ${getCurrentDate()}</p>
                    </div>

                    <div class="weather-content">
                        <div class="weather-grid">
                            <div class="weather-main">
                                <div>
                                    <div class="weather-icon">${getWeatherIcon(weather.weatherCode)}</div>
                                    <div class="weather-temp">${weather.temperature}°C</div>
                                    <div class="weather-desc">${getWeatherDescription(weather.weatherCode)}</div>
                                </div>
                            </div>

                            <div class="weather-details">
                                <div class="detail-card">
                                    <div class="detail-content">
                                        <div class="detail-icon">💨</div>
                                        <div class="detail-text">
                                            <h3>Tốc độ gió</h3>
                                            <p>${weather.windSpeed} <span>km/h</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="detail-card">
                                    <div class="detail-content">
                                        <div class="detail-icon humidity">💧</div>
                                        <div class="detail-text">
                                            <h3>Độ ẩm</h3>
                                            <p>${weather.humidity}<span>%</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="weather-note">
                                    <h4>💡 Lưu ý cho tình nguyện viên</h4>
                                    <p>${getWeatherNote(weather)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="weather-footer">
                        <p>📍 Nhà chung: 123 Đường ABC, Quận XYZ, Hà Nội</p>
                        <button class="refresh-btn" onclick="fetchWeather()">
                            🔄 Cập nhật
                        </button>
                    </div>
                </div>

                <div class="weather-cta">
                    <p>🐾 Sẵn sàng tham gia đội ngũ tình nguyện viên?</p>
                    <a href="mailto:contact@hanoipetadoption.com" class="cta-button">Đăng ký ngay! 💗</a>
                </div>
            `;
        }

        // Load weather khi trang được tải
        fetchWeather();