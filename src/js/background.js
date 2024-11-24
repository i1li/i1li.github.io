if (!isMobile) {
let lastUpdateTime = performance.now();
let accumulatedTime = 0;
const intervalDuration = 300;
window.addEventListener('focus', throttle(() => isWindowActive = true, 500));
window.addEventListener('blur', throttle(() => isWindowActive = false, 500));
document.addEventListener('visibilitychange', throttle(() => {
  isWindowActive = !document.hidden;
  if (!document.hidden) {
    lastUpdateTime = performance.now();
    accumulatedTime = 0;
  }
}, 500));  
const shiftLayer1 = document.getElementById("shift-layer1");
const shiftLayer2 = document.getElementById("shift-layer2");
let shiftLayer1State = createLayerState(false);
let shiftLayer2State = createLayerState(true);
function randomlyModifyValue(value, minFactor = 0.85, maxFactor = 1.15) {
  if (Math.random() < 0.333) {
    const factor = Math.random() * (maxFactor - minFactor) + minFactor;
    return Math.round(value * factor);
  }
  return Math.round(value);
}
function getRandomInRange(isShiftLayer2, min, max, modifier = 1) {
  return isShiftLayer2 ? randomlyModifyValue(Math.random() * (max - min) + min) * modifier : randomlyModifyValue(Math.random() * (max - min) + min) * modifier;
}
function getRandomHueIncrement(isShiftLayer2) {
  return getRandomInRange(isShiftLayer2, -3, 3);
}
function getIntervalsTillNextChange(isShiftLayer2) {
  return getRandomInRange(isShiftLayer2, 10, 20);
}
function getRandomFilterValue(isShiftLayer2) {
  return getRandomInRange(isShiftLayer2, 87, 185);
}
function getRandomOpacityValue(isShiftLayer2) {
  return getRandomInRange(isShiftLayer2, 0.6, 1);
}
function getRandomHueStep(isShiftLayer2) {
  return isShiftLayer2 ? 7 * Math.ceil(Math.random() * 3) : randomlyModifyValue(Math.ceil(Math.random() * 5) + 2);
}
function createLayerState(isShiftLayer2) {
  const intervalsTillNextChange = getIntervalsTillNextChange(isShiftLayer2);
  return {
    hueIncrement: getRandomHueIncrement(isShiftLayer2),
    intervalCount: 0,
    intervalsTillNextChange: isShiftLayer2 ? intervalsTillNextChange : Math.round(intervalsTillNextChange * Math.random()),
    transitionProgress: 0,
    transitionDuration: intervalsTillNextChange * intervalDuration,
    currentHueStep: getRandomHueStep(isShiftLayer2),
    currentContrast: 100,
    currentBrightness: 100,
    currentSaturation: 100,
    currentOpacity: 0.75,
    targetHueStep: getRandomHueStep(isShiftLayer2),
    targetContrast: getRandomFilterValue(isShiftLayer2),
    targetBrightness: getRandomFilterValue(isShiftLayer2),
    targetSaturation: getRandomFilterValue(isShiftLayer2),
    targetOpacity: getRandomOpacityValue(isShiftLayer2),
    hueShift: 0
  };
}
function setGradient(element, state, isShiftLayer2 = false) {
  function getAdjustedHue(currentStep, hueAngle) {
    return (currentStep * hueAngle);
    }
  const width = element.offsetWidth || element.clientWidth; 
  const height = element.offsetHeight || element.clientHeight;
  const diagonal = Math.sqrt(width * width + height * height);
  const percentage = (diagonal / (Math.max(width, height) * Math.sqrt(2))) * 100;
  let gradients = [];
  const hueStep = state.currentHueStep;
  const hueAngle = 360 / hueStep;
  for (let i = 0; i < hueStep; i++) {
    const angle = i * hueAngle;
    const x = 50 + 50 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 50 * Math.sin(angle * Math.PI / 180);
    const currentStep = isShiftLayer2 ? i + state.currentHueStep : i;
    gradients.push(`radial-gradient(ellipse farthest-corner at ${x}% ${y}%, hsl(${getAdjustedHue(currentStep, hueAngle)}, 100%, 50%), transparent ${percentage}%)`);
  }
  element.style.backgroundImage = gradients.join(', ');
  element.style.opacity = state.currentOpacity;    
  element.style.filter = `contrast(${state.currentContrast}%) brightness(${state.currentBrightness}%) saturate(${state.currentSaturation}%) hue-rotate(${state.hueShift}deg)`;
}
function updateLayerState(state, isShiftLayer2, deltaTime) {
  state.intervalCount += deltaTime;
  state.transitionProgress += (deltaTime / state.transitionDuration) * (.2 + (Math.random() * .5));
  if (state.transitionProgress > 1) state.transitionProgress = 1;
  const t = easeWithNoise(state.transitionProgress);
  if (isShiftLayer2) {
    state.currentHueStep += (state.targetHueStep - state.currentHueStep) * (t * 0.0005) * Math.random();
  } else {
    state.currentHueStep += (state.targetHueStep - state.currentHueStep) * (t * 0.005) * Math.random();
  }
  state.currentContrast += (state.targetContrast - state.currentContrast) * t;
  state.currentBrightness += (state.targetBrightness - state.currentBrightness) * t;
  state.currentSaturation += (state.targetSaturation - state.currentSaturation) * t;
  state.currentOpacity += (state.targetOpacity - state.currentOpacity) * t;
  state.hueShift += state.hueIncrement * (deltaTime / 1000); 
  if (state.intervalCount >= state.intervalsTillNextChange * intervalDuration) {
    state.intervalCount = 0;
    state.transitionProgress = 0;
    state.hueIncrement = getRandomHueIncrement(isShiftLayer2);
    state.intervalsTillNextChange = getIntervalsTillNextChange(isShiftLayer2);
    state.transitionDuration = state.intervalsTillNextChange * intervalDuration;
    state.targetHueStep = getRandomHueStep(isShiftLayer2);
    state.targetContrast = getRandomFilterValue(isShiftLayer2);
    state.targetBrightness = getRandomFilterValue(isShiftLayer2);
    state.targetSaturation = getRandomFilterValue(isShiftLayer2);
    state.targetOpacity = getRandomOpacityValue(isShiftLayer2);
  }
}
function updateColors(timestamp) {
    const deltaTime = timestamp - lastUpdateTime;
    accumulatedTime += deltaTime;
    updateLayerState(shiftLayer1State, false, deltaTime);
    updateLayerState(shiftLayer2State, true, deltaTime);
    setGradient(shiftLayer1, shiftLayer1State);
    setGradient(shiftLayer2, shiftLayer2State, true);
    lastUpdateTime = timestamp;
    throttledAnimationFrame(updateColors);
}
const throttledAnimationFrame = throttle((callback) => {
    requestAnimationFrame(callback);
}, 16);
if (isWindowActive) {
  throttledAnimationFrame(updateColors);
}
}
