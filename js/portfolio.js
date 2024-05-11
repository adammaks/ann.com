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