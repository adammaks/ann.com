document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll(".video");
    const videoLinks = document.querySelectorAll(".video-link");

    // Добавляем обработчик события клика на ссылки
    videoLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Отменяем стандартное действие ссылки

            const videoId = this.getAttribute("data-video");

            // Удаляем класс "active" у всех видео
            videos.forEach(video => {
                video.classList.remove("active");
            });

            // Добавляем класс "active" только к выбранному видео
            const selectedVideo = document.getElementById(videoId);
            selectedVideo.classList.add("active");

            // Перематываем видео до начала и запускаем его
            selectedVideo.currentTime = 0;
            selectedVideo.play();
            
            // Останавливаем и сбрасываем текущее видео
            videos.forEach(video => {
                if (video !== selectedVideo) {
                    video.pause(); // Останавливаем видео
                    video.currentTime = 0; // Сбрасываем текущее время до начала
                }
            });
        });
    });
});
function highlightButton(element) {
    // Сначала снимаем выделение со всех кнопок и заголовков
    var buttons = document.querySelectorAll('.video-link');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
        var header = btn.querySelector('h6');
        if (header) {
            header.classList.remove('active');
        }
    });

    // Затем добавляем класс 'active' к выбранной кнопке и заголовку
    element.classList.add('active');
    var header = element.querySelector('h6');
    if (header) {
        header.classList.add('active');
    }
}

// Добавляем обработчики событий для всех кнопок
var buttons = document.querySelectorAll('.video-link');
buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
        highlightButton(btn);
    });
});

//Скролл текста
// Функция, чтобы проверить, если элемент находится в видимой части экрана
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция, чтобы обработать событие прокрутки страницы
function handleScroll() {
    var elements = document.querySelectorAll('.gradient span , .contacts a , .portfolio-block-2 svg , .anim-strela');
    elements.forEach(function(element) {
        if (isElementInViewport(element)) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)'; // Убираем смещение по оси Y
        }
    });
}

// Обработчик события прокрутки страницы
window.addEventListener('scroll', handleScroll);

// Вызвать обработчик события при загрузке страницы
window.addEventListener('load', handleScroll);

//Пауза видео 
document.addEventListener("DOMContentLoaded", function() {
    const videos = document.querySelectorAll(".video");

    videos.forEach(video => {
        video.addEventListener("mouseenter", function() {
            videos.forEach(v => {
                if (!v.paused) {
                    v.pause();
                }
            });
        });

        video.addEventListener("mouseleave", function() {
            videos.forEach(v => {
                if (v.paused) {
                    v.play();
                }
            });
        });
    });
});

//Скрипт для галереии

//Меню кнопки преключает блоки
function showGallery(index) {
    // Скрыть все блоки галереи
    let galleryBlocks = document.querySelectorAll('.gallery-block');
    galleryBlocks.forEach(block => {
        block.style.display = 'none';
    });

    // Показать выбранный блок галереи
    let selectedBlock = document.querySelector('.gallery-block-' + index);
    if (selectedBlock) {
        selectedBlock.style.display = 'grid';
    }
}

//Зажатием мыши двигаем галерею
// Прокрутка
const galleryBlocks = document.querySelectorAll('.gallery-block');
galleryBlocks.forEach(scrollContainer => {
    let isDragging = false;
    let startX, startScrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = scrollContainer.scrollLeft;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.pageX - startX;
            scrollContainer.scrollLeft = startScrollLeft - deltaX;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    scrollContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        startScrollLeft = scrollContainer.scrollLeft;
        e.preventDefault(); // Отключаем стандартное поведение прокрутки
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            const deltaX = touch.pageX - startX;
            scrollContainer.scrollLeft = startScrollLeft - deltaX;
            e.preventDefault(); // Отключаем стандартное поведение прокрутки
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    scrollContainer.addEventListener('mouseenter', () => {
        scrollContainer.style.cursor = 'grab'; // Изменяем курсор при наведении на контейнер
    });

    scrollContainer.addEventListener('mouseleave', () => {
        scrollContainer.style.cursor = 'auto'; // Возвращаем стандартный курсор при уходе с контейнера
    });
});

//Модальное окно при нажатии
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('scrollVideo');
    let isDragging = false;
    let startX, startScrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        startScrollLeft = scrollContainer.scrollLeft;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.pageX - startX;
            scrollContainer.scrollLeft = startScrollLeft - deltaX;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    scrollContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        startScrollLeft = scrollContainer.scrollLeft;
        e.preventDefault(); // Отключаем стандартное поведение прокрутки
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            const deltaX = touch.pageX - startX;
            scrollContainer.scrollLeft = startScrollLeft - deltaX;
            e.preventDefault(); // Отключаем стандартное поведение прокрутки
        }
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    scrollContainer.addEventListener('mouseenter', () => {
        scrollContainer.style.cursor = 'grab'; // Изменяем курсор при наведении на контейнер
    });

    scrollContainer.addEventListener('mouseleave', () => {
        scrollContainer.style.cursor = 'auto'; // Возвращаем стандартный курсор при уходе с контейнера
    });

    // Получаем все видео в галерее
    const galleryVideos = document.querySelectorAll('.gallery-block-video > video');

    // Получаем всплывающий блок для видео
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    // Добавляем обработчик клика на каждое видео
    galleryVideos.forEach(video => {
        video.addEventListener('dblclick', () => {
            const videoSource = video.currentSrc; // Получаем текущий источник видео
            modalVideo.src = videoSource; // Устанавливаем источник для всплывающего видео
            modalVideo.load(); // Загружаем видео
            videoModal.style.display = 'block'; // Отображаем всплывающий блок
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('scrollVideo');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    let isDragging = false;
    let startX, startScrollLeft;
    
        // Закрытие модального окна при клике на крестик
        const closeModalButton = document.querySelector('.modal .close');
        closeModalButton.addEventListener('click', () => {
            closeModal();
        });
    
        function closeModal() {
            videoModal.style.display = 'none';
            modalVideo.pause();
        }
    });
//Пауза клик
// Находим элемент видео по его id
var video = document.getElementById('modalVideo');

// Флаг для отслеживания состояния видео (играет или на паузе)
var isPlaying = false;

// Добавляем обработчик события клика на видео
video.addEventListener('click', function() {
    if (isPlaying) {
        video.pause(); // Если видео играет, ставим его на паузу
        isPlaying = false;
    } else {
        video.play(); // Если видео на паузе, запускаем его
        isPlaying = true;
    }
});