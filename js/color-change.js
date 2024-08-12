// Only run this code on non-mobile devices
if (detectMobile()) {
// Random Color on Hover, Click, or Touch of Links, Buttons + other elements
const hoverShift = document.querySelectorAll('button, a, a.dark-mode, .article-header-wrapper, footer, .article-nav-bottom, #site-nav a, .section-nav a');
// Shift colors of elements in 'alwaysShift' at randomly varying rate, regardless of hover.
const alwaysShift = document.querySelectorAll('header, #site-nav .col, .section-nav .col, .article-header, footer, .article-title, #site-title, #light-dark-zoom');
function startAlwaysShift(element, interval) {
  let randomDegree = Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;
  let randomSaturation = Math.random() * (125 - 90) + 90;
  let randomContrast = Math.random() * (170 - 80) + 80;
  let randomBrightness = Math.random() * (135 - 85) + 85;
  return setInterval(() => {
    randomDegree += element.shiftIncrement;
    element.style.filter = `hue-rotate(${randomDegree}deg) saturate(${randomSaturation}%) contrast(${randomContrast}%) brightness(${randomBrightness}%)`;
  }, interval);
}
function startHoverShift(element, interval = 100) {
  let randomDegree = Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;
  let randomSaturation = Math.random() * (125 - 90) + 90;
  let randomContrast = Math.random() * (170 - 80) + 80;
  let randomBrightness = Math.random() * (135 - 85) + 85;
  return setInterval(() => {
    Math.random() < 0.5 ? randomDegree += Math.floor(Math.random() * 11) + 1 : randomDegree -= Math.floor(Math.random() * 11);
    element.style.filter = `hue-rotate(${randomDegree}deg) saturate(${randomSaturation}%) contrast(${randomContrast}%) brightness(${randomBrightness}%) drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))`;
  }, interval);
}
function handleDisengage(element, intervalId) {
  clearInterval(intervalId);
  element.style.filter = 'none';
}
alwaysShift.forEach(element => {
  element.shiftIncrement = Math.floor(Math.random() * 111) + 1;
  const randomInterval = 111 + Math.floor(Math.random() * 1001);
  element.intervalId = startAlwaysShift(element, randomInterval);
  setInterval(() => {
    element.shiftIncrement = Math.random() < 0.5 ? Math.floor(Math.random() * 11) + 1 : Math.floor(Math.random() * -10);
  }, 111 + Math.random() * 1234);
});
hoverShift.forEach(element => {
  let intervalId;
  let disengageTimeout;
  element.addEventListener('mouseover', () => {
    intervalId = startHoverShift(element);
  });
  element.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = startHoverShift(element);
  });
  element.addEventListener('touchstart', () => {
    clearInterval(intervalId);
    intervalId = startHoverShift(element);
    disengageTimeout = setTimeout(() => handleDisengage(element, intervalId), 888);
  });
  element.addEventListener('mouseout', () => {
    handleDisengage(element, intervalId);
  });
});
}
