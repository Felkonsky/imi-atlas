// slider.js

export function initSlider({ sliderWrapperSelector, slidesSelector, prevButtonSelector, nextButtonSelector, idx }) {
  const sliderWrapper = document.querySelector(sliderWrapperSelector);
  const slides = document.querySelectorAll(slidesSelector);
  const prevBtn = document.querySelector(prevButtonSelector);
  const nextBtn = document.querySelector(nextButtonSelector);

  let currentIndex = idx;
  const totalSlides = slides.length - 1;

  // init
  sliderWrapper.setAttribute('data-value', currentIndex);
  updateSlidePosition();

  function updateSlidePosition() {
    const slideWidth = slides[0].clientWidth;
    sliderWrapper.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }

  // update based on button interaction
  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex < totalSlides ? currentIndex + 1 : 0;
    sliderWrapper.setAttribute('data-value', currentIndex);
    updateSlidePosition();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides;
    sliderWrapper.setAttribute('data-value', currentIndex);
    updateSlidePosition();
  });

  // resize
  window.addEventListener('resize', updateSlidePosition);
}
