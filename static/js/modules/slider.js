export function initSlider({ sliderWrapperSelector, slidesSelector, prevButtonSelector, nextButtonSelector, idx }) {
  const sliderWrapper = document.querySelector(sliderWrapperSelector);
  let slides = document.querySelectorAll(slidesSelector);
  let slideWidth = slides[0].clientWidth;
  let currentIndex = idx;

  const prevBtn = document.querySelector(prevButtonSelector);
  const nextBtn = document.querySelector(nextButtonSelector);

  // Clone slides
  const firstSlideClone = slides[0].cloneNode(true);
  const lastSlideClone = slides[slides.length - 1].cloneNode(true);

  sliderWrapper.appendChild(firstSlideClone);
  sliderWrapper.insertBefore(lastSlideClone, slides[0]);
  // Re-select slides after cloning
  slides = sliderWrapper.querySelectorAll(slidesSelector);

  // We now have slides.length = original slides + 2
  const totalRealSlides = slides.length - 2; // minus the 2 clones

  // Start at index = 1 (the first real slide)
  sliderWrapper.setAttribute('data-value', currentIndex);

  // Initialize position
  updateSlidePosition();

  // Next button
  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalRealSlides + 1) {
      currentIndex++;
      // sliderWrapper.setAttribute('data-value', currentIndex);
      sliderWrapper.style.transition = 'transform 0.4s ease-in-out';
      updateSlidePosition();
    }
  });

  // Prev button
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      // sliderWrapper.setAttribute('data-value', currentIndex);
      sliderWrapper.style.transition = 'transform 0.4s ease-in-out';
      updateSlidePosition();
    }
  });

  // Listen for transition end to handle the “jump”
  sliderWrapper.addEventListener('transitionend', () => {
    if (currentIndex === 0) {
      // Cloned last slide. Jump to the real last slide
      sliderWrapper.style.transition = 'none';
      currentIndex = totalRealSlides;
      updateSlidePosition();
    } else if (currentIndex === totalRealSlides + 1) {
      // Cloned first slide. Jump to the real first slide
      sliderWrapper.style.transition = 'none';

      currentIndex = 1;
      updateSlidePosition();
    }
    sliderWrapper.setAttribute('data-value', currentIndex);
  });

  window.addEventListener('resize', () => {
    slideWidth = slides[0].clientWidth;
    updateSlidePosition();
  });

  function updateSlidePosition() {
    sliderWrapper.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }
}
