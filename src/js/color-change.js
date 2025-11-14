if (!isMobile) {

const hoverShift = document.querySelectorAll('button, a, .article-nav-bottom, footer');
const alwaysShift = document.querySelectorAll('header, #site-title, #toolbar, nav .col a, .article-header, .article-title, .section-nav, footer');

function getRandomDegree() {
  // More uniform distribution and efficient rounding
  return Math.random() < 0.5
    ? -45 - Math.floor(Math.random() * 270)
    : 46 + Math.floor(Math.random() * 224);
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
  let currentDegree = getRandomDegree();
  let targetDegree = currentDegree;
  let currentSaturation = 100, targetSaturation = 100;
  let currentContrast = 100, targetContrast = 100;
  let currentBrightness = 100, targetBrightness = 100;
  let progress = 0;
  let lastTime = performance.now();
  let isRunning = true;

  function updateFilter() {
    const filterValue = `
      hue-rotate(${currentDegree}deg)
      saturate(${currentSaturation}%)
      contrast(${currentContrast}%)
      brightness(${currentBrightness}%)
      ${isHover ? 'drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))' : ''}
    `.trim();
    element.style.filter = filterValue;
  }

  function animate(time) {
    if (!isRunning) return;
    if (isWindowActive && isElementInViewport(element)) {
      const deltaTime = time - lastTime;
      lastTime = time;
      progress += deltaTime / interval;

      if (progress >= 1) {
        targetDegree = getRandomDegree();
        targetSaturation = Math.random() * 35 + 90; // 90-125
        targetContrast = Math.random() * (isHover ? 90 : 40) + 80;
        targetBrightness = Math.random() * (isHover ? 50 : 20) + (isHover ? 85 : 90);
        progress = 0;
      }

      const t = () => metaRecursiveEaseNoise(progress);

      currentDegree += Math.round((targetDegree - currentDegree) * t() * Math.random() * 0.07);
      currentSaturation += Math.round((targetSaturation - currentSaturation) * t() * Math.random());
      currentContrast += Math.round((targetContrast - currentContrast) * t() * Math.random());
      currentBrightness += Math.round((targetBrightness - currentBrightness) * t() * Math.random());

      updateFilter();
    }

    if (isRunning) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  return () => {
    isRunning = false;
    element.style.filter = 'none';
  };
}

function handleDisengage(element, stopAnimationFunction) {
  if (stopAnimationFunction) {
    stopAnimationFunction();
  }
  element.style.filter = 'none';
}

// Initialize alwaysShift elements with throttled animations
alwaysShift.forEach(element => {
  element.animateFunction = throttle(() => startShift(element, getRandomInterval()), 30)();
});

// Initialize hoverShift elements with event handlers and throttle/debounce control
hoverShift.forEach(element => {
  let stopAnimationFunction = null;
  let disengageTimeout = null;

  const startAnim = throttle(() => {
    if (stopAnimationFunction) stopAnimationFunction();
    stopAnimationFunction = startShift(element, getRandomInterval(), true);
  }, 30);

  element.addEventListener('mouseover', startAnim);
  element.addEventListener('click', startAnim);
  element.addEventListener('touchstart', () => {
    if (stopAnimationFunction) stopAnimationFunction();
    stopAnimationFunction = startShift(element, getRandomInterval(), true);
    disengageTimeout = setTimeout(() => handleDisengage(element, stopAnimationFunction), 888);
  });
  element.addEventListener('mouseout', debounce(() => handleDisengage(element, stopAnimationFunction), 30));
});

}
