// Увеличение изображений
document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно для изображений
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");
    
    // Добавляем обработчики на все изображения с классом zoomable
    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
    
    // Закрытие при клике вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // Закрытие клавишей ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });
    
    // Простая статистика (используем LocalStorage)
    initializeStats();
});

// Функции для статистики
function initializeStats() {
    // Проверяем, первый ли это визит
    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', new Date().toISOString());
        localStorage.setItem('visitCount', 0);
        localStorage.setItem('pageViews', 0);
    }
    
    // Увеличиваем счетчики
    let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
    let pageViews = parseInt(localStorage.getItem('pageViews')) || 0;
    
    visitCount++;
    pageViews++;
    
    localStorage.setItem('visitCount', visitCount);
    localStorage.setItem('pageViews', pageViews);
    localStorage.setItem('lastVisit', new Date().toISOString());
    
    // Показываем статистику (для отладки)
    console.log('Статистика:', {
        visits: visitCount,
        pageViews: pageViews,
        firstVisit: localStorage.getItem('firstVisit')
    });
}

// Функция для показа статистики (вызовите в консоли браузера)
function showStats() {
    const statsSection = document.getElementById('stats');
    const statsContent = document.getElementById('statistics');
    
    const visitCount = localStorage.getItem('visitCount') || 0;
    const pageViews = localStorage.getItem('pageViews') || 0;
    const firstVisit = new Date(localStorage.getItem('firstVisit')).toLocaleDateString();
    
    statsContent.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${visitCount}</div>
                <div class="stat-label">Визитов</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${pageViews}</div>
                <div class="stat-label">Просмотров</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${firstVisit}</div>
                <div class="stat-label">Первый визит</div>
            </div>
        </div>
    `;
    
    statsSection.style.display = 'block';
    statsSection.scrollIntoView({ behavior: 'smooth' });
}

// Для доступа к статистике из консоли
window.showStats = showStats;