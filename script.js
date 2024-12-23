// Select necessary elements
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

// Get the width of a single slide
const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides side by side
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Function to move the carousel track
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
};

// Function to handle next button click
const handleNextButtonClick = () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    const nextSlide = currentSlide.nextElementSibling;

    if (nextSlide) {
        currentSlide.classList.remove('current-slide');
        nextSlide.classList.add('current-slide');
        moveToSlide(track, currentSlide, nextSlide);
    }
};

// Function to handle previous button click
const handlePrevButtonClick = () => {
    const currentSlide = track.querySelector('.current-slide') || slides[0];
    const prevSlide = currentSlide.previousElementSibling;

    if (prevSlide) {
        currentSlide.classList.remove('current-slide');
        prevSlide.classList.add('current-slide');
        moveToSlide(track, currentSlide, prevSlide);
    }
};

// Attach event listeners to buttons
nextButton.addEventListener('click', handleNextButtonClick);
prevButton.addEventListener('click', handlePrevButtonClick);

// Optional: Auto-rotate carousel
const autoRotateCarousel = () => {
    setInterval(() => {
        handleNextButtonClick();
    }, 5000); // Adjust timing as needed (e.g., 5000ms = 5 seconds)
};

// Uncomment the line below to enable auto-rotation
// autoRotateCarousel();
