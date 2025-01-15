// slider.js

export function initSlider({ sliderWrapperSelector, slidesSelector, prevButtonSelector, nextButtonSelector, idx }) {
  const sliderWrapper = document.querySelector(sliderWrapperSelector);
  const slides = document.querySelectorAll(slidesSelector);
  const prevBtn = document.querySelector(prevButtonSelector);
  const nextBtn = document.querySelector(nextButtonSelector);

  let currentIndex = idx;
  updateSlidePosition();

  function updateSlidePosition() {
    const slideWidth = slides[0].clientWidth;
    sliderWrapper.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlidePosition();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      // wrap around
      currentIndex = slides.length - 1;
    }
    updateSlidePosition();
  });

  window.addEventListener('resize', updateSlidePosition);
}
