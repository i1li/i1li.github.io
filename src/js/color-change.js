if (!isMobile) {
const hoverShift = document.querySelectorAll('button, a, a.dark-mode, footer, .article-nav-bottom, #site-nav a, .section-nav a');
const alwaysShift = document.querySelectorAll('header, #site-nav .col, .section-nav .col, .article-header, footer, .article-title, #site-title, #toolbar');
function getRandomDegree() {return Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;}
function getNewIntervalsTillNextChange() {return Math.floor(Math.random() * 30) + 20;}
function getRandomInterval() {return Math.floor(Math.random() * 1000) + 500;}
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const verticalEdgeThreshold = viewportHeight * 0.7;
  return (
    rect.top >= -verticalEdgeThreshold &&
    rect.left >= 0 &&
    rect.bottom <= viewportHeight + verticalEdgeThreshold &&
    rect.right <= viewportWidth
  );
}
function startShift(element, interval, isHover = false) {
  let currentDegree = getRandomDegree();
  let targetDegree = currentDegree;
  let currentSaturation = 100;
  let targetSaturation = 100;
  let currentContrast = 100;
  let targetContrast = 100;
  let currentBrightness = 100;
  let targetBrightness = 100;
  let progress = 0;
  let intervalsTillNextChange = getNewIntervalsTillNextChange();
  let lastTime = performance.now();
  let isRunning = true;
  function updateFilter() {
    if (!isRunning) return;
    element.style.filter = `
      hue-rotate(${currentDegree}deg)
      saturate(${currentSaturation}%)
      contrast(${currentContrast}%)
      brightness(${currentBrightness}%)
      ${isHover ? 'drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))' : ''}
    `;
  }
  function animate(time) {
    if (!isRunning) return;
    if (isWindowActive && isElementInViewport(element)) {
      const deltaTime = time - lastTime;
      lastTime = time;
      progress += deltaTime / (interval * intervalsTillNextChange);
      if (progress >= 1) {
        targetDegree += getRandomDegree();
        targetSaturation = Math.random() * (125 - 90) + 90;
        targetContrast = Math.random() * (isHover ? 170 - 80 : 120 - 80) + 80;
        targetBrightness = Math.random() * (isHover ? 135 - 85 : 110 - 90) + (isHover ? 85 : 90);
        progress = 0;
        intervalsTillNextChange = getNewIntervalsTillNextChange();
      }
      const t = () => metaRecursiveEaseNoise(progress);
      currentDegree += Math.round((targetDegree - currentDegree) * t() * 10) / 10;
      currentSaturation += Math.round((targetSaturation - currentSaturation) * t() * 10) / 10;
      currentContrast += Math.round((targetContrast - currentContrast) * t() * 10) / 10;
      currentBrightness += Math.round((targetBrightness - currentBrightness) * t() * 10) / 10;
      updateFilter();
    }
    if (isRunning) {
      requestAnimationFrame(animate);
    }
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
alwaysShift.forEach((element) => {
  element.animateFunction = throttle(() => {
    return startShift(element, getRandomInterval());
  }, 30)();
});
hoverShift.forEach(element => {
  let stopAnimationFunction;
  let disengageTimeout;
  element.addEventListener('mouseover', throttle(() => {
    if (stopAnimationFunction) stopAnimationFunction();
    stopAnimationFunction = startShift(element, getRandomInterval(), true);
  }, 30));  
  element.addEventListener('click', () => {
    if (stopAnimationFunction) stopAnimationFunction();
    stopAnimationFunction = startShift(element, getRandomInterval(), true);
  });
  element.addEventListener('touchstart', () => {
    if (stopAnimationFunction) stopAnimationFunction();
    stopAnimationFunction = startShift(element, getRandomInterval(), true);
    disengageTimeout = setTimeout(() => handleDisengage(element, stopAnimationFunction), 888);
  });
  element.addEventListener('mouseout', debounce(() => {
    handleDisengage(element, stopAnimationFunction);
  }, 30));
});
}
