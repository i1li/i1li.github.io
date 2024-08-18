// Only run this code on non-mobile devices
if (detectMobile()) {
    const box = document.getElementById("box");
    const overlay = document.getElementById("overlay");
    let isWindowActive = true;
    window.addEventListener('focus', () => isWindowActive = true);
    window.addEventListener('blur', () => isWindowActive = false);
    function getRandomHueIncrement() {
        return Math.random() < 0.5 ? Math.random() * -0.75 - 0.75 : Math.random() * 0.75 + 0.75;
    }
    function getIntervalsTillNextChange() {
        return Math.floor(Math.random() * 72) + 72;
    }
    function getRandomOverlayOffset() {
        return Math.random() * 11 + 3; 
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
            hueStep: isOverlay ? getRandomOverlayOffset() : BOX_HUE_STEP 
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
    }
    function updateLayerState(state, isOverlay) {
        state.hueIndex = (state.hueIndex + state.hueIncrement + 360) % 360;
        state.intervalCount++;
        if (state.intervalCount >= state.intervalsTillNextChange) {
            state.hueIncrement = getRandomHueIncrement();
            if (isOverlay) {
                state.targetOverlayOffset = getRandomOverlayOffset();
                state.transitionDuration = getIntervalsTillNextChange();
            }
            state.intervalCount = 0;
            state.intervalsTillNextChange = getIntervalsTillNextChange();
        }
        if (isOverlay) {
            state.transitionProgress += .0005 / state.transitionDuration; 
            if (state.transitionProgress >= 1) {
                state.transitionProgress = 0; 
                state.currentOverlayOffset = state.targetOverlayOffset; 
            } else {
                state.currentOverlayOffset += (state.targetOverlayOffset - state.currentOverlayOffset) * easeInOutCubic(state.transitionProgress);
            }
        }
    }
    function updateColors() {
        if (isWindowActive) {
            updateLayerState(boxState, false);
            updateLayerState(overlayState, true);
            setGradient(box, boxState);
            setGradient(overlay, overlayState, true);
        }
    }
    setGradient(box, boxState);
    setGradient(overlay, overlayState, true);
    setInterval(updateColors, 33);
}
