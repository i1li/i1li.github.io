// Random Color on Hover, Click, or Touch of Links, Buttons + other elements
const hover = document.querySelectorAll('button, a, a.dark-mode, .article-header-wrapper, footer, .article-nav-bottom');
// Shift colors of elements in 'alwaysShiftRandomly' at randomly varying rate, regardless of hover.
const alwaysShiftRandomly = document.querySelectorAll('header, #site-nav .col, #site-nav, .section-nav .col, .article-header, footer, .article-title, #site-title, #light-dark-zoom');
// Rotate hue between -315 and 315 degrees, excluding -45 to 45. (Avoids similar hue ranges.)
function startColorShiftAlwaysShiftRandomly(element, interval = 100) {
  let randomDegree = Math.random() < 0.5 ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;
  element.style.filter = `hue-rotate(${randomDegree}deg)`;
  return setInterval(() => {
    randomDegree += element.shiftIncrement;
    element.style.filter = `hue-rotate(${randomDegree}deg)`;
  }, interval);
}
function startColorShiftHover(element, interval = 100) {
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
alwaysShiftRandomly.forEach(element => {
  element.shiftIncrement = Math.floor(Math.random() * 111) + 1;
  const randomInterval = Math.floor(Math.random() * (1111 - 111 + 1)) + 111;
  element.intervalId = startColorShiftAlwaysShiftRandomly(element, randomInterval);
  setInterval(() => {
    element.shiftIncrement = Math.random() < 0.5 ? Math.floor(Math.random() * 11) + 1 : Math.floor(Math.random() * -10);
  }, Math.random() * 1000 + 111);
});
hover.forEach(element => {
  let intervalId;
  let disengageTimeout;
  element.addEventListener('mouseover', () => {
    intervalId = startColorShiftHover(element);
  });
  element.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = startColorShiftHover(element);
  });
  element.addEventListener('touchstart', () => {
    clearInterval(intervalId);
    intervalId = startColorShiftHover(element);
    disengageTimeout = setTimeout(() => handleDisengage(element, intervalId), 888);
  });
  element.addEventListener('mouseout', () => {
    handleDisengage(element, intervalId);
  });
});
