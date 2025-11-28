const hoverShift = document.querySelectorAll('button, a, .article-nav-bottom, footer');
const alwaysShift = document.querySelectorAll('header, #site-title, #toolbar, nav .col a, .article-header, .article-title, .section-nav, footer');
function getRandomHueRotation() {
  return Math.random() < 0.5
    ? -45 - Math.floor(Math.random() * 270)
    : 45 + Math.floor(Math.random() * 270);
}
function getRandomInterval() {
  return 7000 + Math.floor(Math.random() * 14000);
}
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const vw = window.innerWidth || document.documentElement.clientWidth;
  const edgeThreshold = vh * 0.8;
  return (
    rect.top >= -edgeThreshold &&
    rect.left >= 0 &&
    rect.bottom <= vh + edgeThreshold &&
    rect.right <= vw
  );
}
function startShift(element, interval, isHover = false) {
  let currentHueRotation = getRandomHueRotation();
  let targetHueRotation = currentHueRotation;
  let currentSaturation = 100, targetSaturation = 100;
  let currentContrast = 100, targetContrast = 100;
  let currentBrightness = 100, targetBrightness = 100;
  let progress = 0;
  let lastTime = performance.now();
  let isRunning = true;
  function updateFilter() {
    const filterValue = `
      hue-rotate(${currentHueRotation}deg)
      saturate(${currentSaturation}%)
      contrast(${currentContrast}%)
      brightness(${currentBrightness}%)
      ${isHover ? 'drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))' : ''}
    `.trim();
    element.style.filter = filterValue;
  }
  function animateColors(time) {
    if (!isRunning) return;
    if (isWindowActive && isElementInViewport(element)) {
      const CCDeltaTime = time - lastTime;
      lastTime = time;
      progress += CCDeltaTime / interval;
      if (progress >= 1) {
        targetHueRotation = getRandomHueRotation();
        targetSaturation = Math.random() * 35 + 90; // 90-125
        targetContrast = Math.random() * (isHover ? 90 : 40) + 80;
        targetBrightness = Math.random() * (isHover ? 50 : 20) + (isHover ? 85 : 90);
        progress = 0;
      }
      const t = () => metaRecursiveEaseNoise(progress);
      currentHueRotation += Math.round((targetHueRotation - currentHueRotation) * t() * Math.random() * 0.07);
      currentSaturation += Math.round((targetSaturation - currentSaturation) * t() * Math.random());
      currentContrast += Math.round((targetContrast - currentContrast) * t() * Math.random());
      currentBrightness += Math.round((targetBrightness - currentBrightness) * t() * Math.random());
      updateFilter();
    }
    if (isRunning) requestAnimationFrame(animateColors);
  }
  // Initial filter apply (starts from random state)
  updateFilter();
  requestAnimationFrame(animateColors);
  return () => {
    isRunning = false;
    element.style.filter = 'none';
  };
}
function handleDisengage(element, stopAnim) {
  if (stopAnim) {
    stopAnim();
  }
  element.style.filter = 'none';
}
setTimeout(() => {
  // Viewport-lazy with light staggering: Observe in batches for gradual init
  const observerOptions = {
    threshold: 0,
    rootMargin: '200px',
  };
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const element = entry.target;
      if (entry.isIntersecting && !element._isAnimating) {
        element._stopper = startShift(element, getRandomInterval());
        element._isAnimating = true;
      }
    });
  }, observerOptions);
  // Stagger .observe() calls lightly (~20ms batches) for perf ramp-up
  let observeDelay = 0;
  const observeBatchSize = 15;
  alwaysShift.forEach((element, index) => {
    setTimeout(() => {
      animationObserver.observe(element);
    }, observeDelay);
    if (index % observeBatchSize === observeBatchSize - 1) {
      observeDelay += 10;
    }
  });
  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    alwaysShift.forEach(element => {
      if (element._stopper) {
        element._stopper();
        element._stopper = null;
      }
    });
    animationObserver.disconnect();
  });
  if (!isMobile) {
    hoverShift.forEach(element => {
      let stopAnim = null;
      let disengageTimeout = null;
      const sharedHoverHandler = throttle((event) => {
        if (stopAnim) stopAnim();
        stopAnim = startShift(element, getRandomInterval(), true);
      }, 30);
      const sharedDisengage = debounce(() => handleDisengage(element, stopAnim), 30);
      element.addEventListener('mouseover', sharedHoverHandler);
      element.addEventListener('click', sharedHoverHandler);
      element.addEventListener('touchstart', () => {
        if (stopAnim) stopAnim();
        stopAnim = startShift(element, getRandomInterval(), true);
        if (disengageTimeout) clearTimeout(disengageTimeout);
        disengageTimeout = setTimeout(() => handleDisengage(element, stopAnim), 888);
      });
      element.addEventListener('mouseout', sharedDisengage);
    });
  }
}, delayOtherResources2);
