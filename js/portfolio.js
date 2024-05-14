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

// Сами видосы
// Получаем элемент блока с видео
var videoBlock = document.getElementById("gallery_video_block_1");

// Получаем все элементы video внутри блока
var videos = videoBlock.getElementsByTagName("video");

// Обработчик события click для входа/выхода из полноэкранного режима
function toggleFullscreen(event) {
  event.preventDefault(); // Предотвращаем действие по умолчанию (пауза)
  var video = this; // Получаем ссылку на текущее видео
  var videoContainer = video.closest(".gallery-video-click-full"); // Ищем ближайший родительский блок с классом gallery-video-click-full
  if (!videoContainer) return; // Если такой блок не найден, выходим из функции
  if (!videoContainer.classList.contains("fullscreen")) {
    // Если родительский блок не находится в полноэкранном режиме
    videoContainer.classList.add("fullscreen"); // Добавляем класс fullscreen к родительскому блоку
  } else {
    // Если родительский блок находится в полноэкранном режиме
    videoContainer.classList.remove("fullscreen"); // Удаляем класс fullscreen у родительского блока
  }
}

// Добавляем обработчики событий ко всем видео в блоке
for (var i = 0; i < videos.length; i++) {
  var video = videos[i];
  video.dataset.currentTime = 0; // Устанавливаем атрибут для хранения текущего времени воспроизведения
  video.addEventListener("click", toggleFullscreen);
}

// Обработчик события click для выхода из полноэкранного режима при любом клике на странице
document.addEventListener("click", function(event) {
  var fullscreenVideos = document.querySelectorAll(".gallery-video-click-full.fullscreen");
  for (var i = 0; i < fullscreenVideos.length; i++) {
    var videoContainer = fullscreenVideos[i];
    if (!videoContainer.contains(event.target)) {
      videoContainer.classList.remove("fullscreen");
    }
  }
});

