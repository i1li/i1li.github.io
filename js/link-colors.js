// Random Color on Hover, Click, or Touch of Links and Buttons
// Rotate hue between -315 and 315 degrees, excluding -45 to 45. While hover active, shift 5 degrees per .1 second.
const hover = document.querySelectorAll('button, a, a.dark-mode');
hover.forEach(element => {
  let intervalId;
  let disengageTimeout;
  element.addEventListener('mouseover', handleHover);
  element.addEventListener('click', handleClick);
  element.addEventListener('touchstart', handleTouch);
  function handleHover() {
    startColorShift();
  }
  function handleClick() {
    clearInterval(intervalId);
    startColorShift();
  }
  function handleTouch() {
    clearInterval(intervalId);
    startColorShift();
    disengageTimeout = setTimeout(handleDisengage, 888);
  }
  function handleDisengage() {
    clearInterval(intervalId);
    element.style.filter = 'none';
    element.style.webkitFilter = 'none';
  }
  function startColorShift() {
    const isNegative = Math.random() < 0.5;
    let randomDegree = isNegative ? Math.floor(Math.random() * -270) - 45 : Math.floor(Math.random() * 270) + 46;
    element.style.filter = `hue-rotate(${randomDegree}deg)`;
    element.style.webkitFilter = `hue-rotate(${randomDegree}deg)`;
    intervalId = setInterval(() => {
      randomDegree += isNegative ? -5 : 5;
      element.style.filter = `hue-rotate(${randomDegree}deg)`;
      element.style.webkitFilter = `hue-rotate(${randomDegree}deg)`;
    }, 100);
  }
  element.addEventListener('mouseout', () => {handleDisengage()});
});
