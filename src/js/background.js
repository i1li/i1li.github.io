if (!isMobile) {
const shiftLayer1 = document.getElementById("shift-layer1");
const shiftLayer2 = document.getElementById("shift-layer2");
let shiftLayer1State = createLayerState(shiftLayer1);
let shiftLayer2State = createLayerState(shiftLayer2);
function getShiftLayerInfo(element) {
  const allLayers = document.querySelectorAll('[id^="shift-layer"]');
  const totalLayers = allLayers.length;
  const match = element.id.match(/shift-layer(\d+)/);
  const currentLayer = match ? parseInt(match[1]) : null;
  return { currentLayer, totalLayers };
}
function randomlyModifyValue(value, minFactor = 0.85, maxFactor = 1.15) {
  if (Math.random() < 0.333) {
    const factor = Math.random() * (maxFactor - minFactor) + minFactor;
    return Math.round(value * factor);
  }
  return Math.round(value);
}
function getRandomInRange(min, max, modifier = 1, element) {
  const { currentLayer, totalLayers } = getShiftLayerInfo(element);
  for (let i = 1; i <= totalLayers; i++) {
    if (currentLayer === i) {
      return randomlyModifyValue(Math.random() * (max - min) + min) * modifier;
    }
  }
}
function getRandomTransitionDuration(element) {
  const randomValue = getRandomInRange(8000, 33000, 1, element);
  return Math.round(randomValue); 
}
function getRandomHueShift(element) {
  const randomValue = getRandomInRange(-180, 180, 1, element);
  return Math.round(randomValue * 10) / 10; 
}
function getRandomFilterValue(element) {
  const randomValue = getRandomInRange(87, 185, 1, element);
  return Math.round(randomValue * 10) / 10; 
}
function getRandomOpacityValue(element) {
  const randomValue = getRandomInRange(65, 95, 1, element);
  return Math.round(randomValue * 10) / 10; 
}
function getRandomGradientSteps(element) {
  const { currentLayer } = getShiftLayerInfo(element);
  return currentLayer === 2 ? 7 * Math.ceil(Math.random() * 3) : randomlyModifyValue(Math.ceil(Math.random() * 5) + 2);
}
function createLayerState(element) {
  const { currentLayer } = getShiftLayerInfo(element);
  return {
    transitionCurrentTime: 0,
    transitionProgress: 0,
    transitionDuration: currentLayer === 2 ? 5000 : 8000,
    currentGradientSteps: currentLayer === 2 ? 7 : 14,
    currentContrast: 100,
    currentBrightness: 100,
    currentSaturation: 100,
    currentOpacity: 0.75,
    currentHueShift: 0,
    targetGradientSteps: getRandomGradientSteps(element),
    targetContrast: getRandomFilterValue(element),
    targetBrightness: getRandomFilterValue(element),
    targetSaturation: getRandomFilterValue(element),
    targetOpacity: getRandomOpacityValue(element),
    targetHueShift: getRandomHueShift(element),
  };
}
function setGradient(element, state) {
  const { currentLayer } = getShiftLayerInfo(element);
  function getAdjustedHue(currentGradientStep, gradientAngle) {
    return (currentGradientStep * gradientAngle);
    }
  const width = element.offsetWidth || element.clientWidth; 
  const height = element.offsetHeight || element.clientHeight;
  const diagonal = Math.sqrt(width * width + height * height);
  const percentage = (diagonal / (Math.max(width, height) * Math.sqrt(2))) * 100;
  let gradients = [];
  const gradientSteps = state.currentGradientSteps;
  const gradientAngle = 360 / gradientSteps;
  for (let i = 0; i < gradientSteps; i++) {
    const angle = i * gradientAngle;
    const x = 50 + 50 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 50 * Math.sin(angle * Math.PI / 180);
    const currentGradientStep = i + state.currentGradientSteps;
    gradients.push(`radial-gradient(ellipse farthest-corner at ${Math.round(x * 10) / 10}% ${Math.round(y * 10) / 10}%, hsl(${getAdjustedHue(currentGradientStep, gradientAngle)}, 100%, 50%), transparent ${Math.round(percentage * 10) / 10}%)`);
  }
  element.style.backgroundImage = gradients.join(', ');
  element.style.filter = `opacity(${state.currentOpacity}%) contrast(${state.currentContrast}%) brightness(${state.currentBrightness}%) saturate(${state.currentSaturation}%) hue-rotate(${state.currentHueShift}deg)`;
}
function updateLayerState(state, element, deltaTime) {
  state.transitionCurrentTime += deltaTime;
  state.transitionProgress += (deltaTime / state.transitionDuration);
  if (state.transitionProgress > 1) state.transitionProgress = 1;
  const t = () => metaRecursiveEaseNoise(state.transitionProgress);
  const { currentLayer } = getShiftLayerInfo(element);
  if (currentLayer === 2) {
    state.currentGradientSteps += (state.targetGradientSteps - state.currentGradientSteps) * (t() * 0.0005) * Math.random();
  } else {
    state.currentGradientSteps += (state.targetGradientSteps - state.currentGradientSteps) * (t() * 0.005) * Math.random();
  }
  state.currentContrast += Math.round((state.targetContrast - state.currentContrast) * t() * 10) / 10;
  state.currentBrightness += Math.round((state.targetBrightness - state.currentBrightness) * t() * 10) / 10;
  state.currentSaturation += Math.round((state.targetSaturation - state.currentSaturation) * t() * 10) / 10;
  state.currentOpacity += Math.round((state.targetOpacity - state.currentOpacity) * t() * 10) / 10;
  state.currentHueShift += Math.round((state.targetHueShift - state.currentHueShift) * (t() * 0.05) * Math.random() * 10) / 10; 
  if (state.transitionCurrentTime >= state.transitionDuration) {
    state.transitionCurrentTime = 0;
    state.transitionProgress = 0;
    state.transitionDuration = getRandomTransitionDuration(element);
    state.targetHueShift = getRandomHueShift(element);
    state.targetGradientSteps = getRandomGradientSteps(element);
    state.targetContrast = getRandomFilterValue(element);
    state.targetBrightness = getRandomFilterValue(element);
    state.targetSaturation = getRandomFilterValue(element);
    state.targetOpacity = getRandomOpacityValue(element);
  }
}
function updateColors(updateTime) {
  if (!isWindowActive) {
    requestAnimationFrame(updateColors);
    return;
  }
  const deltaTime = updateTime - lastUpdateTime;
  lastUpdateTime = updateTime;
  updateLayerState(shiftLayer1State, shiftLayer1, deltaTime);
  updateLayerState(shiftLayer2State, shiftLayer2, deltaTime);
  setGradient(shiftLayer1, shiftLayer1State);
  setGradient(shiftLayer2, shiftLayer2State);
  requestAnimationFrame(updateColors);
}
requestAnimationFrame(updateColors);
}
