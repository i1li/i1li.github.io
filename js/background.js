// Only run this code on non-mobile devices
if (detectMobile()) {
const box = document.getElementById("box");
const overlay = document.getElementById("overlay");
let isWindowActive = !document.hidden;
document.addEventListener('visibilitychange', () => {
    isWindowActive = !document.hidden;
});
window.addEventListener('focus', () => isWindowActive = true);
window.addEventListener('blur', () => isWindowActive = false);
function getRandomHueIncrement() {
    return Math.random() < 0.5 ? Math.random() * -0.6 - 1.15 : Math.random() * 0.6 + 1.15;
}
function getIntervalsTillNextChange() {
    return Math.floor(Math.random() * 12) + 3;
}
const intervalDuration = 150;
function getRandomOverlayOffset() {
    return Math.floor(Math.random() * 11) + 3; 
}
function getRandomFilterValue() {
    return Math.floor(Math.random() * 80) + 85; 
}
function getRandomOpacityValue(currentOpacity) {
    const change = (Math.random() * 0.4 - 0.2); 
    let newOpacity = currentOpacity + change;
    if (newOpacity < 0.65) newOpacity = 0.7;
    if (newOpacity > .95) newOpacity = .9;
    return newOpacity;
}
const BOX_HUE_STEP = 7;
const BOX_HUE_ANGLE = 360 / BOX_HUE_STEP;
function getAdjustedHue(index, step, hueAngle) {
    return (index + step * hueAngle + 360) % 360;
}
function createLayerState(isOverlay) {
    return {
        hueIndex: 0,
        hueIncrement: getRandomHueIncrement(),
        intervalCount: 0,
        intervalsTillNextChange: getIntervalsTillNextChange(),
        currentOverlayOffset: isOverlay ? getRandomOverlayOffset() : 0,
        targetOverlayOffset: isOverlay ? getRandomOverlayOffset() : 0,
        transitionProgress: 0,
        transitionDuration: isOverlay ? getIntervalsTillNextChange() * intervalDuration : 0,
        hueStep: isOverlay ? getRandomOverlayOffset() : BOX_HUE_STEP,
        currentContrast: 100,
        currentBrightness: 100,
        currentSaturation: 100,
        targetContrast: getRandomFilterValue(),
        targetBrightness: getRandomFilterValue(),
        targetSaturation: getRandomFilterValue(),
        currentOpacity: 0.75,
        targetOpacity: getRandomOpacityValue()
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
    const hueStep = state.hueStep;
    const hueAngle = 360 / hueStep;
    for (let i = 0; i < hueStep; i++) {
        const angle = i * hueAngle;
        const x = 50 + 50 * Math.cos(angle * Math.PI / 180);
        const y = 50 + 50 * Math.sin(angle * Math.PI / 180);
        const currentStep = isOverlay ? i + state.currentOverlayOffset : i;
        gradients.push(`radial-gradient(ellipse farthest-corner at ${x}% ${y}%, hsl(${getAdjustedHue(state.hueIndex, currentStep, hueAngle)}, 100%, 50%), transparent ${percentage}%)`);
    }
    element.style.backgroundImage = gradients.join(', ');
    element.style.filter = `contrast(${state.currentContrast}%) brightness(${state.currentBrightness}%) saturate(${state.currentSaturation}%)`;
    element.style.opacity = state.currentOpacity; 
}
function updateLayerState(state, isOverlay) {
    state.hueIndex = (state.hueIndex + state.hueIncrement + 360) % 360;
    state.intervalCount++;
    state.transitionProgress += intervalDuration * (Math.random() * 0.00045 + 0.00005);
    if (state.transitionProgress > 1) state.transitionProgress = 1;
    const t = easeInOutCubic(state.transitionProgress);
    if (isOverlay) {
        state.currentOverlayOffset += (state.targetOverlayOffset - state.currentOverlayOffset) * t;
    }
    state.currentContrast += (state.targetContrast - state.currentContrast) * t;
    state.currentBrightness += (state.targetBrightness - state.currentBrightness) * t;
    state.currentSaturation += (state.targetSaturation - state.currentSaturation) * t;
    state.currentOpacity += (state.targetOpacity - state.currentOpacity) * t;
    if (state.intervalCount >= state.intervalsTillNextChange && state.transitionProgress >= 1) {
        state.intervalCount = 0;
        state.transitionProgress = 0;
        state.hueIncrement = getRandomHueIncrement();
        state.intervalsTillNextChange = getIntervalsTillNextChange();
        state.transitionDuration = state.intervalsTillNextChange * intervalDuration;
        state.targetContrast = getRandomFilterValue();
        state.targetBrightness = getRandomFilterValue();
        state.targetSaturation = getRandomFilterValue();
        state.targetOpacity = getRandomOpacityValue(state.currentOpacity);
    }
}
let lastUpdateTime = performance.now();
function updateColors(timestamp) {
    if (isWindowActive && timestamp - lastUpdateTime >= intervalDuration) {
        updateLayerState(boxState, false);
        updateLayerState(overlayState, true);
        setGradient(box, boxState);
        setGradient(overlay, overlayState, true);
        lastUpdateTime += intervalDuration; 
    }
    requestAnimationFrame(updateColors);
}
setGradient(box, boxState);
setGradient(overlay, overlayState, true);
requestAnimationFrame(updateColors);
}
