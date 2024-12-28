document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    let currentIndex = 0;

    // Arrange the slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    // Move to the next slide
    const moveToNextSlide = () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0; // Loop back to the first slide
        }
        const targetSlide = slides[currentIndex];
        track.style.transform = `translateX(-${targetSlide.style.left})`;
    };

    // Start auto-scroll
    let autoScrollInterval = setInterval(moveToNextSlide, 8000); // Slow transition every 8 seconds

    // Pause auto-scroll on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    carousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(moveToNextSlide, 8000); // Restart auto-scroll
    });

    // Optional: Manual controls
    const prevButton = document.querySelector('.carousel-btn.prev');
    const nextButton = document.querySelector('.carousel-btn.next');

    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        moveToNextSlide();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        moveToNextSlide();
    });
});
