if (detectMobile()) {
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
    function randomlyModifyValue(value) {
        if (Math.random() < 0.333) {
            const factor = Math.random() * 1.15 + 0.85;
            return Math.round(value * factor);
        }
        return Math.round(value);
    }
    function getRandomHueIncrement(isOverlay) {
        if (isOverlay) {
            let increment = Math.random() < 0.5 ? Math.random() * -1.5 - 1.5 : Math.random() * 1.5 + 1.5;
            return randomlyModifyValue(increment);
        } else {
            let increment = Math.random() < 0.5 ? Math.random() * -1.5 - 1.5 : Math.random() * 1.5 + 1.5;
            return randomlyModifyValue(increment);
        }
    }
    function getIntervalsTillNextChange() {
        return randomlyModifyValue(Math.floor(Math.random() * 12) + 3);
    }
    function getRandomFilterValue(isOverlay) {
        if (isOverlay) {
            return randomlyModifyValue(Math.floor(Math.random() * 98) + 87);
        } else {
            return randomlyModifyValue(Math.floor(Math.random() * 98) + 87);
        }
    }
    function getRandomOpacityValue(currentOpacity, isOverlay) {
        const change = (Math.random() * 0.4 - 0.2);
        let newOpacity = currentOpacity + change;
        if (isOverlay) {
            if (newOpacity < 0.62) newOpacity = 0.7 + (Math.random() * .1);
            if (newOpacity > 0.92) newOpacity = 0.9 + (Math.random() * .1);
        } else {
            if (newOpacity < 0.62) newOpacity = 0.7 + (Math.random() * .1);
            if (newOpacity > 0.92) newOpacity = 0.9 + (Math.random() * .1);
        }
        return randomlyModifyValue(newOpacity);
    }
    function getRandomHueStep(isOverlay) {
        return isOverlay ? randomlyModifyValue(Math.floor(Math.random() * 4) + 5) : BOX_HUE_STEP;
    }
    const intervalDuration = 250;
    const BOX_HUE_STEP = 7;
    const BOX_HUE_ANGLE = 360 / BOX_HUE_STEP;
    function getAdjustedHue(currentStep, hueAngle) {
        return (currentStep * hueAngle);
    }
    function createLayerState(isOverlay) {
        const intervalsTillNextChange = getIntervalsTillNextChange();
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
            targetOpacity: getRandomOpacityValue(0.75, isOverlay),
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
    function updateLayerState(state, isOverlay) {
        state.intervalCount++;
        state.transitionProgress += intervalDuration * (Math.random() * 0.00045 + 0.00005);
        if (state.transitionProgress > 1) state.transitionProgress = 1;
        const t = easeInOutCubic(state.transitionProgress);
        if (isOverlay) {
            state.currentHueStep += (state.targetHueStep - state.currentHueStep) * (t * .01) ;
        }
        state.currentContrast += (state.targetContrast - state.currentContrast) * t;
        state.currentBrightness += (state.targetBrightness - state.currentBrightness) * t;
        state.currentSaturation += (state.targetSaturation - state.currentSaturation) * t;
        state.currentOpacity += (state.targetOpacity - state.currentOpacity) * t;
        state.hueShift += state.hueIncrement;
        if (state.intervalCount >= state.intervalsTillNextChange && state.transitionProgress >= 1) {
            state.intervalCount = 0;
            state.transitionProgress = 0;
            state.hueIncrement = getRandomHueIncrement(isOverlay);
            state.intervalsTillNextChange = getIntervalsTillNextChange();
            state.transitionDuration = state.intervalsTillNextChange * intervalDuration;
            state.targetHueStep = getRandomHueStep(isOverlay);
            state.targetContrast = getRandomFilterValue(isOverlay);
            state.targetBrightness = getRandomFilterValue(isOverlay);
            state.targetSaturation = getRandomFilterValue(isOverlay);
            state.targetOpacity = getRandomOpacityValue(state.currentOpacity, isOverlay);
        }
    }
let lastUpdateTime = performance.now();
let accumulatedTime = 0;
function updateColors(timestamp) {
        const deltaTime = timestamp - lastUpdateTime;
        accumulatedTime += deltaTime;
        while (accumulatedTime >= intervalDuration) {
            updateLayerState(boxState, false);
            updateLayerState(overlayState, true);
            setGradient(box, boxState);
            setGradient(overlay, overlayState, true);
            accumulatedTime -= intervalDuration;
        }
    lastUpdateTime = timestamp;
    requestAnimationFrame(updateColors);
}
if (isWindowActive) {
    setGradient(box, boxState);
    setGradient(overlay, overlayState, true);
    requestAnimationFrame(updateColors);
}
}
