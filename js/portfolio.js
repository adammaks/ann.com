//Кэширование с использованием Service Workers Вы можете использовать Service Workers для кэширования ресурсов на стороне клиента. Регистрация Service Worker:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(error) {
      console.log('ServiceWorker registration failed: ', error);
    });
  }
//Функиця lazyload
document.addEventListener("DOMContentLoaded", function() {
    const lazyVideos = document.querySelectorAll("video.lazyload");
  
    if ("IntersectionObserver" in window) {
      const lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const lazyVideo = entry.target;
  
            // Получаем ссылку из атрибута data-src
            const videoSource = lazyVideo.querySelector('source');
            const videoSrc = videoSource.getAttribute('data-src');
  
            if (videoSrc) {
              lazyVideo.src = videoSrc;
              lazyVideo.load();
              lazyVideo.classList.remove("lazyload");
              lazyVideoObserver.unobserve(lazyVideo);
            } else {
              console.error('No data-src attribute found for video', lazyVideo);
            }
          }
        });
      });
  
      lazyVideos.forEach(function(lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    }
  });
  
//*------------*/  
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
//Сама галерея
document.addEventListener('DOMContentLoaded', () => {
    const galleryBlocks = document.querySelectorAll('.gallery-block');

    galleryBlocks.forEach(scrollContainer => {
        let isDragging = false;
        let startX, startY, startScrollLeft, startScrollTop;
        let threshold = 10;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            startY = e.pageY;
            startScrollLeft = scrollContainer.scrollLeft;
            startScrollTop = scrollContainer.scrollTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.pageX - startX;
                if (Math.abs(deltaX) > threshold) {
                    scrollContainer.scrollLeft = startScrollLeft - deltaX;
                }
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        scrollContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            startScrollLeft = scrollContainer.scrollLeft;
            startScrollTop = scrollContainer.scrollTop;
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                const deltaX = touch.pageX - startX;
                const deltaY = touch.pageY - startY;

                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    // Vertical scroll
                    scrollContainer.scrollTop = startScrollTop - deltaY;
                } else if (Math.abs(deltaX) > threshold) {
                    // Horizontal scroll
                    scrollContainer.scrollLeft = startScrollLeft - deltaX;
                    e.preventDefault(); // Отключаем стандартное поведение прокрутки только для горизонтальной прокрутки
                }
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        scrollContainer.addEventListener('mouseenter', () => {
            scrollContainer.style.cursor = 'grab';
        });

        scrollContainer.addEventListener('mouseleave', () => {
            scrollContainer.style.cursor = 'auto';
        });
    });

    // Модальное окно при нажатии
    const scrollContainer = document.getElementById('scrollVideo');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModalButton = document.querySelector('.modal .close');
    
    let isVideoDragging = false;
    let videoStartX, videoStartScrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isVideoDragging = true;
        videoStartX = e.pageX;
        videoStartScrollLeft = scrollContainer.scrollLeft;
    });

    document.addEventListener('mousemove', (e) => {
        if (isVideoDragging) {
            const deltaX = e.pageX - videoStartX;
            if (Math.abs(deltaX) > threshold) {
                scrollContainer.scrollLeft = videoStartScrollLeft - deltaX;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isVideoDragging = false;
    });

    scrollContainer.addEventListener('touchstart', (e) => {
        isVideoDragging = true;
        videoStartX = e.touches[0].pageX;
        videoStartScrollLeft = scrollContainer.scrollLeft;
    });

    document.addEventListener('touchmove', (e) => {
        if (isVideoDragging) {
            const touch = e.touches[0];
            const deltaX = touch.pageX - videoStartX;
            if (Math.abs(deltaX) > threshold) {
                scrollContainer.scrollLeft = videoStartScrollLeft - deltaX;
                e.preventDefault(); // Отключаем стандартное поведение прокрутки только для горизонтальной прокрутки
            }
        }
    });

    document.addEventListener('touchend', () => {
        isVideoDragging = false;
    });

    scrollContainer.addEventListener('mouseenter', () => {
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseleave', () => {
        scrollContainer.style.cursor = 'auto';
    });

    // Получаем все видео в галерее
    const galleryVideos = document.querySelectorAll('.gallery-block-video > video');

    // Добавляем обработчик клика на каждое видео
    galleryVideos.forEach(video => {
        video.addEventListener('dblclick', () => {
            const videoSource = video.currentSrc; // Получаем текущий источник видео
            modalVideo.src = videoSource; // Устанавливаем источник для всплывающего видео
            modalVideo.load(); // Загружаем видео
            videoModal.style.display = 'block'; // Отображаем всплывающий блок
        });
    });

    // Закрытие модального окна при клике на крестик
    closeModalButton.addEventListener('click', () => {
        videoModal.style.display = 'none';
        modalVideo.pause();
    });

    // Пауза клик
    var modalVideoElement = document.getElementById('modalVideo');

    // Флаг для отслеживания состояния видео (играет или на паузе)
    var isPlaying = false;

    // Добавляем обработчик события клика на видео
    modalVideoElement.addEventListener('click', function() {
        if (isPlaying) {
            modalVideoElement.pause(); // Если видео играет, ставим его на паузу
            isPlaying = false;
        } else {
            modalVideoElement.play(); // Если видео на паузе, запускаем его
            isPlaying = true;
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var videos = document.querySelectorAll(".gallery-block-video video");

    videos.forEach(function(videoElement) {
        // Обработчик события canplaythrough будет вызван, когда видео будет готово к воспроизведению без перерывов
        videoElement.addEventListener("canplaythrough", function() {
            var videoBlock = videoElement.parentElement;
            var loadingContainer = videoBlock.querySelector(".loading-container");
            
            // Скрываем элемент загрузки после того, как видео будет готово к воспроизведению
            loadingContainer.style.display = "none";
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const threshold = 10; // Пороговое значение для определения горизонтального движения
    let isDragging = false;
    let startX, startY, startScrollLeft;

    // Функция для начала перемещения
    const startDragging = (e) => {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        startY = e.pageY || e.touches[0].pageY;
        startScrollLeft = scrollContainer.scrollLeft;
    };

    // Функция для окончания перемещения
    const stopDragging = () => {
        isDragging = false;
    };

    // Функция для перемещения
    const handleDragging = (e) => {
        if (isDragging) {
            const currentX = e.pageX || e.touches[0].pageX;
            const deltaX = currentX - startX;

            // Определение направления перемещения
            if (Math.abs(deltaX) > threshold) {
                scrollContainer.scrollLeft = startScrollLeft - deltaX;
                e.preventDefault(); // Отмена стандартного поведения
            }
        }
    };

    // Получаем контейнер галереи
    const scrollContainer = document.getElementById('scrollVideo');

    // Добавляем обработчики событий для мыши и сенсорных устройств
    scrollContainer.addEventListener('mousedown', startDragging);
    scrollContainer.addEventListener('touchstart', startDragging);

    document.addEventListener('mousemove', handleDragging);
    document.addEventListener('touchmove', handleDragging);

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    // Добавляем обработчик событий для трекпада (дополнительный вариант)
    scrollContainer.addEventListener('wheel', (e) => {
        // Проверяем направление прокрутки
        if (e.deltaX !== 0 || e.wheelDeltaX !== 0) {
            // Изменяем положение прокрутки горизонтально
            scrollContainer.scrollLeft += e.deltaX || e.wheelDeltaX;
            e.preventDefault(); // Отмена стандартного поведения
        }
    });
});
