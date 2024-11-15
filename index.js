document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const backgroundBlur = document.querySelector('.background-blur');
    
    let currentSlide = 0;
    let autoSlideInterval;
    const slideInterval = 5000;

    const setBackgroundImage = (index) => {
        const currentImage = slides[index].querySelector('img').src;
        backgroundBlur.style.backgroundImage = `url(${currentImage})`;
    };

    const goToSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        thumbnails.forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active-thumbnail', i === index);
        });
        currentSlide = index;
        setBackgroundImage(index);
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Start auto-slide and set initial background
    startAutoSlide();
    setBackgroundImage(currentSlide);
});
