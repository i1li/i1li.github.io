// Only run this code on non-mobile devices
if (detectMobile()) {
const hoverShift = document.querySelectorAll('button, a, a.dark-mode, footer, .article-nav-bottom, #site-nav a, .section-nav a');
const alwaysShift = document.querySelectorAll('header, #site-nav .col, .section-nav .col, .article-header, footer, .article-title, #site-title, #light-dark-zoom');
function getRandomDegree() {return Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;}
function getNewIntervalsTillNextChange() {return Math.floor(Math.random() * 5) + 7;}
function getRandomInterval() {return Math.floor(Math.random() * 1000) + 333;}
let isWindowActive = !document.hidden;
document.addEventListener('visibilitychange', () => {
    isWindowActive = !document.hidden;
});
window.addEventListener('focus', () => isWindowActive = true);
window.addEventListener('blur', () => isWindowActive = false);
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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
  let intervalCount = 0;
  let intervalsTillNextChange = getNewIntervalsTillNextChange();
  function updateFilter() {
    element.style.filter = `
      hue-rotate(${currentDegree}deg)
      saturate(${currentSaturation}%)
      contrast(${currentContrast}%)
      brightness(${currentBrightness}%)
      ${isHover ? 'drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))' : ''}
    `;
  }
  updateFilter();
  return setInterval(() => {
    if (isWindowActive && isElementInViewport(element)) {
      intervalCount++;
      if (intervalCount >= intervalsTillNextChange) {
        targetDegree += getRandomDegree();
        targetSaturation = Math.random() * (125 - 90) + 90;
        targetContrast = Math.random() * (isHover ? 170 - 80 : 120 - 80) + 80;
        targetBrightness = Math.random() * (isHover ? 135 - 85 : 110 - 90) + (isHover ? 85 : 90);
        intervalCount = 0;
        intervalsTillNextChange = getNewIntervalsTillNextChange();
      }
      currentDegree += (targetDegree - currentDegree) * (Math.random() * 0.015);
      currentSaturation += (targetSaturation - currentSaturation) * (Math.random() * 0.015);
      currentContrast += (targetContrast - currentContrast) * (Math.random() * 0.015);
      currentBrightness += (targetBrightness - currentBrightness) * (Math.random() * 0.015);
      updateFilter();
    }
  }, interval);
}
function handleDisengage(element, intervalId) {
  clearInterval(intervalId);
  element.style.filter = 'none';
}
alwaysShift.forEach((element) => {
  element.intervalId = startShift(element, getRandomInterval());
});
hoverShift.forEach(element => {
  let intervalId;
  let disengageTimeout;
  element.addEventListener('mouseover', () => {
    intervalId = startShift(element, getRandomInterval(), true);
  });
  element.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = startShift(element, getRandomInterval(), true);
  });
  element.addEventListener('touchstart', () => {
    clearInterval(intervalId);
    intervalId = startShift(element, getRandomInterval(), true);
    disengageTimeout = setTimeout(() => handleDisengage(element, intervalId), 888);
  });
  element.addEventListener('mouseout', () => {
    handleDisengage(element, intervalId);
  });
});
}
