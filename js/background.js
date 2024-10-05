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
    return Math.floor(Math.random() * 33) + 10;
}
function getRandomOverlayOffset() {
    return Math.floor(Math.random() * 11) + 3; 
}
function getRandomFilterValue() {
    return Math.floor(Math.random() * 301) + 3; 
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
        transitionDuration: isOverlay ? getIntervalsTillNextChange() : 0,
        hueStep: isOverlay ? getRandomOverlayOffset() : BOX_HUE_STEP,
        currentContrast: 100,
        currentBrightness: 100,
        currentSaturation: 100,
        targetContrast: 100,
        targetBrightness: 100,
        targetSaturation: 100
    };
}
let boxState = createLayerState(false);
let overlayState = createLayerState(true);
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function setGradient(element, state, isOverlay = false) {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
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
}
function updateLayerState(state, isOverlay) {
    state.hueIndex = (state.hueIndex + state.hueIncrement + 360) % 360;
    state.intervalCount++;
    if (state.intervalCount >= state.intervalsTillNextChange) {
        state.hueIncrement = getRandomHueIncrement();
        if (isOverlay) {
            state.targetOverlayOffset = getRandomOverlayOffset();
        }
        state.intervalCount = 0;
        state.intervalsTillNextChange = getIntervalsTillNextChange();
        state.transitionDuration = state.intervalsTillNextChange;
        state.targetContrast = getRandomFilterValue();
        state.targetBrightness = getRandomFilterValue();
        state.targetSaturation = getRandomFilterValue();
        state.transitionProgress = 0;
    }
    state.transitionProgress += 0.0005 / state.transitionDuration;
    if (state.transitionProgress > 1) state.transitionProgress = 1;
    const t = easeInOutCubic(state.transitionProgress);
    if (isOverlay) {
        state.currentOverlayOffset = state.currentOverlayOffset + (state.targetOverlayOffset - state.currentOverlayOffset) * t;
    }
    state.currentContrast = state.currentContrast + (state.targetContrast - state.currentContrast) * t;
    state.currentBrightness = state.currentBrightness + (state.targetBrightness - state.currentBrightness) * t;
    state.currentSaturation = state.currentSaturation + (state.targetSaturation - state.currentSaturation) * t;
}
let lastUpdateTime = 0;
const updateInterval = 33; 
function updateColors(timestamp) {
    if (isWindowActive && timestamp - lastUpdateTime >= updateInterval) {
        updateLayerState(boxState, false);
        updateLayerState(overlayState, true);
        setGradient(box, boxState);
        setGradient(overlay, overlayState, true);
        lastUpdateTime = timestamp;
    }
    requestAnimationFrame(updateColors);
}
setGradient(box, boxState);
setGradient(overlay, overlayState, true);
requestAnimationFrame(updateColors);
}
