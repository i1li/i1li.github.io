// Only run this code on non-mobile devices
if (detectMobile()) {
const hoverShift = document.querySelectorAll('button, a, a.dark-mode, .article-header-wrapper, footer, .article-nav-bottom, #site-nav a, .section-nav a');
const alwaysShift = document.querySelectorAll('header, #site-nav .col, .section-nav .col, .article-header, footer, .article-title, #site-title, #light-dark-zoom');
function getRandomDegree() {return Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;}
function getNewIntervalsTillNextChange() {return Math.floor(Math.random() * 22) + 11;}
function getRandomInterval() {return 111 + Math.floor(Math.random() * 1000);}
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
    intervalCount++;
    if (intervalCount >= intervalsTillNextChange) {
      targetDegree += getRandomDegree();
      targetSaturation = Math.random() * (125 - 90) + 90;
      targetContrast = Math.random() * (isHover ? 170 - 80 : 120 - 80) + 80;
      targetBrightness = Math.random() * (isHover ? 135 - 85 : 110 - 90) + (isHover ? 85 : 90);
      intervalCount = 0;
      intervalsTillNextChange = getNewIntervalsTillNextChange();
    }
    currentDegree += (targetDegree - currentDegree) * 0.05;
    currentSaturation += (targetSaturation - currentSaturation) * 0.05;
    currentContrast += (targetContrast - currentContrast) * 0.05;
    currentBrightness += (targetBrightness - currentBrightness) * 0.05;
    updateFilter();
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
  element.addEventListener('mouseout', () => {handleDisengage(element, intervalId);});
});
}
