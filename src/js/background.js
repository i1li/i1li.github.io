if (!isMobile) {
const box = document.getElementById("box");
const overlay = document.getElementById("overlay");
let isWindowActive = !document.hidden;
document.addEventListener('visibilitychange', () => {
    isWindowActive = !document.hidden;
    if (!document.hidden) {
        lastUpdateTime = performance.now();
        accumulatedTime = 0;
    }
});
window.addEventListener('focus', () => isWindowActive = true);
window.addEventListener('blur', () => isWindowActive = false);
function randomlyModifyValue(value, minFactor = 0.85, maxFactor = 1.15) {
    if (Math.random() < 0.333) {
        const factor = Math.random() * (maxFactor - minFactor) + minFactor;
        return Math.round(value * factor);
    }
    return Math.round(value);
}
function getRandomInRange(isOverlay, min, max, modifier = 1) {
    return isOverlay ? randomlyModifyValue(Math.random() * (max - min) + min) * modifier : randomlyModifyValue(Math.random() * (max - min) + min) * modifier;
}
function getRandomHueIncrement(isOverlay) {
    return getRandomInRange(isOverlay, -3, 3);
}
function getIntervalsTillNextChange(isOverlay) {
    return getRandomInRange(isOverlay, 3, 15);
}
function getRandomFilterValue(isOverlay) {
    return getRandomInRange(isOverlay, 87, 185);
}
function getRandomOpacityValue(isOverlay) {
    return getRandomInRange(isOverlay, 0.6, 1);
}
function getRandomHueStep(isOverlay) {
    return isOverlay ? 7 * Math.ceil(Math.random() * 3) : randomlyModifyValue(Math.ceil(Math.random() * 5) + 2);
}
const intervalDuration = 250;
function getAdjustedHue(currentStep, hueAngle) {
    return (currentStep * hueAngle);
}
function createLayerState(isOverlay) {
    const intervalsTillNextChange = getIntervalsTillNextChange(isOverlay);
    return {
        hueIncrement: getRandomHueIncrement(isOverlay),
        intervalCount: 0,
        intervalsTillNextChange: intervalsTillNextChange,
        transitionProgress: 0,
        transitionDuration: isOverlay ? intervalsTillNextChange * intervalDuration : 0,
        currentHueStep: getRandomHueStep(isOverlay),
        currentContrast: 100,
        currentBrightness: 100,
        currentSaturation: 100,
        currentOpacity: 0.75,
        targetHueStep: getRandomHueStep(isOverlay),
        targetContrast: getRandomFilterValue(isOverlay),
        targetBrightness: getRandomFilterValue(isOverlay),
        targetSaturation: getRandomFilterValue(isOverlay),
        targetOpacity: getRandomOpacityValue(isOverlay),
        hueShift: 0
    };
}
let boxState = createLayerState(false);
let overlayState = createLayerState(true);
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function setGradient(element, state, isOverlay = false) {
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
        const currentStep = isOverlay ? i + state.currentHueStep : i;
        gradients.push(`radial-gradient(ellipse farthest-corner at ${x}% ${y}%, hsl(${getAdjustedHue(currentStep, hueAngle)}, 100%, 50%), transparent ${percentage}%)`);
    }
    element.style.backgroundImage = gradients.join(', ');
    element.style.opacity = state.currentOpacity;        
    element.style.filter = `contrast(${state.currentContrast}%) brightness(${state.currentBrightness}%) saturate(${state.currentSaturation}%) hue-rotate(${state.hueShift}deg)`;
}
let lastUpdateTime = performance.now();
let accumulatedTime = 0;
function updateColors(timestamp) {
    const deltaTime = timestamp - lastUpdateTime;
    accumulatedTime += deltaTime;
    updateLayerState(boxState, false, deltaTime);
    updateLayerState(overlayState, true, deltaTime);
    setGradient(box, boxState);
    setGradient(overlay, overlayState, true);
    lastUpdateTime = timestamp;
    requestAnimationFrame(updateColors);
}
function updateLayerState(state, isOverlay, deltaTime) {
    state.intervalCount += deltaTime;
    state.transitionProgress += (deltaTime / state.transitionDuration) * (.2 + (Math.random() * .5));
    if (state.transitionProgress > 1) state.transitionProgress = 1;
    const t = easeInOutCubic(state.transitionProgress);
    if (isOverlay) {
        state.currentHueStep += (state.targetHueStep - state.currentHueStep) * (t * 0.0005);
    }
    state.currentContrast += (state.targetContrast - state.currentContrast) * t;
    state.currentBrightness += (state.targetBrightness - state.currentBrightness) * t;
    state.currentSaturation += (state.targetSaturation - state.currentSaturation) * t;
    state.currentOpacity += (state.targetOpacity - state.currentOpacity) * t;
    state.hueShift += state.hueIncrement * (deltaTime / 1000); 
    if (state.intervalCount >= state.intervalsTillNextChange * intervalDuration) {
        state.intervalCount = 0;
        state.transitionProgress = 0;
        state.hueIncrement = getRandomHueIncrement(isOverlay);
        state.intervalsTillNextChange = getIntervalsTillNextChange(isOverlay);
        state.transitionDuration = state.intervalsTillNextChange * intervalDuration;
        state.targetHueStep = getRandomHueStep(isOverlay);
        state.targetContrast = getRandomFilterValue(isOverlay);
        state.targetBrightness = getRandomFilterValue(isOverlay);
        state.targetSaturation = getRandomFilterValue(isOverlay);
        state.targetOpacity = getRandomOpacityValue(isOverlay);
    }
}
if (isWindowActive) {
requestAnimationFrame(updateColors);
}
}