const shiftLayer1 = document.getElementById("shift-layer1");
const shiftLayer2 = document.getElementById("shift-layer2");
const bg = document.getElementById('bg');
const allShiftLayers = Array.from(document.querySelectorAll('[id^="shift-layer"]'));
const totalShiftLayers = allShiftLayers.length;
function getShiftLayerInfo(element) {
  const match = element.id.match(/shift-layer(\d+)/);
  const currentLayer = match ? parseInt(match[1]) : null;
  return { currentLayer, totalLayers: totalShiftLayers };
}
function randomlyModifyValue(value, minFactor = 0.85, maxFactor = 1.15) {
  if (Math.random() < 0.333) {
    const factor = Math.random() * (maxFactor - minFactor) + minFactor;
    return Math.round(value * factor);
  }
  return Math.round(value);
}
function getRandomInRange(min, max, modifier = 1, element) {
  if (!element.id.startsWith('shift-layer')) {
    return (Math.random() * (max - min) + min) * modifier;
  }
  const { currentLayer } = getShiftLayerInfo(element);
  if (currentLayer != null) {
    return randomlyModifyValue(Math.random() * (max - min) + min) * modifier;
  }
  return (Math.random() * (max - min) + min) * modifier;
}
function roundTo(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
function getRandomTransitionDuration(element) {
  return Math.round(getRandomInRange(7000, 21000, 1, element));
}
function getRandomHueShift(element) {
  return roundTo(getRandomInRange(-180, 180, 1, element), 1);
}
function getRandomFilterValue(element) {
  return roundTo(getRandomInRange(87, 185, 1, element), 1);
}
function getRandomOpacityValue(element) {
  return roundTo(getRandomInRange(65, 95, 1, element), 1);
}
function getRandomOpacityValue2(element) {
  return roundTo(getRandomInRange(0.29, 0.37, 1, element), 3);
}
function getRandomGradientSteps(element) {
  const { currentLayer } = getShiftLayerInfo(element);
  if (currentLayer === 1) {
    return 7 * Math.ceil(Math.random() * 7);
  }
  return randomlyModifyValue(Math.ceil(Math.random() * 12) + 2);
}
function createLayerState(element) {
  const { currentLayer } = getShiftLayerInfo(element);
  return {
    transitionCurrentTime: 0,
    transitionProgress: 0,
    transitionDuration: currentLayer === 1 ? 8000 : 5000,
    currentGradientSteps: getRandomGradientSteps(element),
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
function createBgLayerState(element) {
  const initialOpacity = element.id === 'bg' ? 0.33 : 1;
  return {
    transitionCurrentTime: 0,
    transitionProgress: 0,
    transitionDuration: getRandomTransitionDuration(element),
    currentOpacity: initialOpacity,
    targetOpacity: getRandomOpacityValue2(element),
  };
}
// Cache the last gradient string to avoid unnecessary DOM writes
let lastGradient1 = '';
let lastGradient2 = '';
function setGradient(element, state) {
  const { currentLayer } = getShiftLayerInfo(element);
  const width = element.offsetWidth || element.clientWidth;
  const height = element.offsetHeight || element.clientHeight;
  const diagonal = Math.sqrt(width ** 2 + height ** 2);
  const percentage = (diagonal / (Math.max(width, height) * Math.sqrt(2))) * 100;
  let gradients = [];
  const gradientSteps = state.currentGradientSteps;
  const gradientAngle = 360 / gradientSteps;
  for (let i = 0; i < gradientSteps; i++) {
    const angle = i * gradientAngle;
    const x = 50 + 50 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 50 * Math.sin(angle * Math.PI / 180);
    const currentGradientStep = i + gradientSteps;
    gradients.push(
      `radial-gradient(ellipse farthest-corner at ${roundTo(x,1)}% ${roundTo(y,1)}%, hsl(${currentGradientStep * gradientAngle}, 100%, 50%), transparent ${roundTo(percentage,1)}%)`
    );
  }
  const gradientString = gradients.join(', ');
  // Only update background if different to reduce style recalcs
  if ((element.id === 'shift-layer1' && gradientString !== lastGradient1) ||
      (element.id === 'shift-layer2' && gradientString !== lastGradient2)) {
    element.style.backgroundImage = gradientString;
    if (element.id === 'shift-layer1') lastGradient1 = gradientString;
    else lastGradient2 = gradientString;
  }
  element.style.filter = `
    opacity(${state.currentOpacity}%)
    contrast(${state.currentContrast}%)
    brightness(${state.currentBrightness}%)
    saturate(${state.currentSaturation}%)
    hue-rotate(${state.currentHueShift}deg)
  `.trim();
}
function updateLayerState(state, element, BGDeltaTime) {
  state.transitionCurrentTime += BGDeltaTime;
  state.transitionProgress = Math.min(1, state.transitionProgress + BGDeltaTime / state.transitionDuration);
  const t = () => metaRecursiveEaseNoise(state.transitionProgress);
  const { currentLayer } = getShiftLayerInfo(element);
  const randomFactor = (max) => Math.random() * max;
  if (currentLayer === 1) {
    state.currentGradientSteps += Math.round((state.targetGradientSteps - state.currentGradientSteps) * t() * 0.00005 * randomFactor(10)) / 10;
    state.currentHueShift += Math.round((state.targetHueShift - state.currentHueShift) * t() * 0.05 * randomFactor(10)) / 10;
  } else {
    state.currentGradientSteps += Math.round((state.targetGradientSteps - state.currentGradientSteps) * t() * 0.05 * randomFactor(10)) / 10;
    state.currentHueShift += Math.round((state.targetHueShift - state.currentHueShift) * t() * 0.01 * randomFactor(10)) / 10;
  }
  state.currentContrast += Math.round((state.targetContrast - state.currentContrast) * t() * randomFactor(1) * 10) / 10;
  state.currentBrightness += Math.round((state.targetBrightness - state.currentBrightness) * t() * randomFactor(1) * 10) / 10;
  state.currentSaturation += Math.round((state.targetSaturation - state.currentSaturation) * t() * randomFactor(1) * 10) / 10;
  state.currentOpacity += Math.round((state.targetOpacity - state.currentOpacity) * t() * randomFactor(1) * 10) / 10;
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
function updateBgLayerState(state, element, BGDeltaTime) {
  state.transitionCurrentTime += BGDeltaTime;
  state.transitionProgress = Math.min(1, state.transitionProgress + (BGDeltaTime / state.transitionDuration) * Math.random());
  const t = () => metaRecursiveEaseNoise(state.transitionProgress);
  state.currentOpacity += Math.round((state.targetOpacity - state.currentOpacity) * t() * Math.random() * 1000) / 1000;
  if (state.transitionCurrentTime >= state.transitionDuration) {
    state.transitionCurrentTime = 0;
    state.transitionProgress = 0;
    state.transitionDuration = getRandomTransitionDuration(element);
    state.targetOpacity = element.id === 'bg' ? getRandomOpacityValue2(element) : getRandomOpacityValue(element);
  }
}
function updateColors(updateTime) {
  if (!isWindowActive) {
    requestAnimationFrame(updateColors);
    return;
  }
  const BGDeltaTime = updateTime - lastBGUpdateTime;
  lastBGUpdateTime = updateTime;
  updateLayerState(shiftLayer1State, shiftLayer1, BGDeltaTime);
  updateLayerState(shiftLayer2State, shiftLayer2, BGDeltaTime);
  setGradient(shiftLayer1, shiftLayer1State);
  setGradient(shiftLayer2, shiftLayer2State);
  updateBgLayerState(bgState, bg, BGDeltaTime);
  bg.style.opacity = bgState.currentOpacity;
  requestAnimationFrame(updateColors);
}
let shiftLayer1State;
let shiftLayer2State;
let bgState;
let lastBGUpdateTime;
setTimeout(() => {
  shiftLayer1State = createLayerState(shiftLayer1);
  shiftLayer2State = createLayerState(shiftLayer2);
  bgState = createBgLayerState(bg);
  lastBGUpdateTime = performance.now();
  requestAnimationFrame(updateColors);
}, 3000);