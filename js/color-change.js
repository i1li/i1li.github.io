// Only run this code on non-mobile devices
if (detectMobile()) {
// Random Color on Hover, Click, or Touch of Links, Buttons + other elements
const hoverShift = document.querySelectorAll('button, a, a.dark-mode, .article-header-wrapper, footer, .article-nav-bottom');
// Shift colors of elements in 'alwaysShift' at randomly varying rate, regardless of hover.
const alwaysShift = document.querySelectorAll('header, #site-nav .col, #site-nav, .section-nav .col, .article-header, footer, .article-title, #site-title, #light-dark-zoom');
// Rotate hue between -315 and 315 degrees, excluding -45 to 45. (Avoids similar hue ranges.)
function startalwaysShift(element, interval) {
  let randomDegree = Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;
  element.style.filter = `hue-rotate(${randomDegree}deg)`;
  return setInterval(() => {
    randomDegree += element.shiftIncrement;
    element.style.filter = `hue-rotate(${randomDegree}deg)`;
  }, interval);
}
function startHoverShift(element, interval = 100) {
  let randomDegree = Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;
  element.style.filter = `hue-rotate(${randomDegree}deg) drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))`;
  return setInterval(() => {
    Math.random() < 0.5 ? randomDegree += Math.floor(Math.random() * 11) + 1 : randomDegree -= Math.floor(Math.random() * 11)
    element.style.filter = `hue-rotate(${randomDegree}deg) drop-shadow(0 0 1em rgba(255, 255, 255, 0.5))`;
  }, interval);
}
function handleDisengage(element, intervalId) {
  clearInterval(intervalId);
  element.style.filter = 'none';
}
alwaysShift.forEach(element => {
  element.shiftIncrement = Math.floor(Math.random() * 111) + 1;
  const randomInterval = 111 + Math.floor(Math.random() * 1001);
  element.intervalId = startalwaysShift(element, randomInterval);
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
