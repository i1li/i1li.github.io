// Only run this code on non-mobile devices
if (detectMobile()) {
const box = document.getElementById("box");
const overlay = document.getElementById("overlay");
let hueIndex = 0;
let intervalCount = 0;
let isWindowActive = true;
window.addEventListener('focus', () => isWindowActive = true);
window.addEventListener('blur', () => isWindowActive = false);
function getRandomHueIncrement() {return Math.random() < 0.5 ? Math.random() * -.75 - .75 : Math.random() * .75 + .75;}
let hueIncrement = getRandomHueIncrement();
function getIntervalsTillNextChange() {return Math.floor(Math.random() * 66) + 33;}
let intervalsTillNextChange = getIntervalsTillNextChange();
const HUE_STEP = 360 / 7;
function getAdjustedHue(index, step) {return (index + step * HUE_STEP + 360) % 360;}
function setGradient(element, index) {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const diagonal = Math.sqrt(width * width + height * height);
    const percentage = (diagonal / (Math.max(width, height) * Math.sqrt(2))) * 100;
    let gradients = [];
    for (let i = 0; i < 7; i++) {
        const angle = i * (360 / 7);
        const x = 50 + 50 * Math.cos(angle * Math.PI / 180);
        const y = 50 + 50 * Math.sin(angle * Math.PI / 180);
        gradients.push(`radial-gradient(ellipse farthest-corner at ${x}% ${y}%, hsl(${getAdjustedHue(index, i)}, 100%, 50%), transparent ${percentage}%)`);
    }
    element.style.backgroundImage = gradients.join(', ');
}
function updateColors() {
        if (isWindowActive) {
        hueIndex = (hueIndex + hueIncrement + 360) % 360;
        intervalCount++;
        if (intervalCount >= intervalsTillNextChange) {
            hueIncrement = getRandomHueIncrement();
            intervalCount = 0;
            intervalsTillNextChange = getIntervalsTillNextChange();
        }
        setGradient(box, hueIndex);
        setGradient(overlay, 360 - hueIndex); 
    }
}
setGradient(box, 0);
setGradient(overlay, 360);
setInterval(updateColors, 33);
}
