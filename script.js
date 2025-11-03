document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".close");
    
    // Увеличение изображений
    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            modal.style.display = "none";
        }
    });

    // Статистика
    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', new Date().toISOString());
        localStorage.setItem('visitCount', '0');
        localStorage.setItem('pageViews', '0');
    }

    let visitCount = parseInt(localStorage.getItem('visitCount'));
    let pageViews = parseInt(localStorage.getItem('pageViews'));

    visitCount++;
    pageViews++;

    localStorage.setItem('visitCount', visitCount.toString());
    localStorage.setItem('pageViews', pageViews.toString());
    localStorage.setItem('lastVisit', new Date().toISOString());

    // Обработчик для кнопки статистики
    document.getElementById('stats-button').addEventListener('click', showStats);
    
    // Проверка прокрутки для показа кнопки
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Проверить при загрузке
});

// Функция проверки прокрутки
function checkScroll() {
    const statsButton = document.getElementById('stats-button');
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    
    // Показываем кнопку когда прокрутили до 90% страницы
    if (scrollPosition >= pageHeight - 100) {
        statsButton.classList.add('show');
    } else {
        statsButton.classList.remove('show');
    }
}

// Функция показа статистики
function showStats() {
    const statsSection = document.createElement('section');
    statsSection.id = 'stats';
    statsSection.innerHTML = `
        <div class="container">
            <h2>📊 Статистика сайта</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">${localStorage.getItem('visitCount')}</div>
                    <div class="stat-label">Всего визитов</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${localStorage.getItem('pageViews')}</div>
                    <div class="stat-label">Просмотров страниц</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${new Date(localStorage.getItem('firstVisit')).toLocaleDateString('ru-RU')}</div>
                    <div class="stat-label">Первый визит</div>
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 20px; padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">Закрыть статистику</button>
        </div>
    `;
    document.body.insertBefore(statsSection, document.querySelector('footer'));
    statsSection.scrollIntoView({ behavior: 'smooth' });
}

window.showStats = showStats;
