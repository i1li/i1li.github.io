// Only run this code on non-mobile devices
if (detectMobile()) {
// Changing background colors, also uses background.css
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const overlay = document.getElementById("overlay");
const overlay2 = document.getElementById("overlay2");
let hueIndex = 0;
let visibleBox = box1;
let hiddenBox = box2;
function getOppositeHueIndex(index) {
    return (index + 180) % 360;
}
function getAdjustedHue(index, adjustment) {
    return (index + adjustment) % 360;
}
function setGradient(box, index) {
    const oppositeIndex = getOppositeHueIndex(index);
    const gradient = `linear-gradient(hsl(${index}, 100%, 50%), hsl(${oppositeIndex}, 100%, 50%))`;
    box.style.backgroundImage = gradient;
}
function setOverlayGradient(index) {
    const adjustedIndex = getAdjustedHue(index, 90);
    const gradient = `linear-gradient(to top, hsl(${adjustedIndex}, 100%, 50%) 50%, transparent 50%)`;
    overlay.style.backgroundImage = gradient;
}
function setOverlay2Gradient(index) {
    const adjustedIndex = getAdjustedHue(index, 270);
    const gradient = `linear-gradient(to left, hsl(${adjustedIndex}, 100%, 50%) 50%, transparent 50%)`;
    overlay2.style.backgroundImage = gradient;
}
function updateColors() {
    hueIndex = (hueIndex + .5) % 360;
    setGradient(hiddenBox, hueIndex);
    setOverlayGradient(hueIndex);
    setOverlay2Gradient(hueIndex);
    hiddenBox.classList.remove("hidden");
    visibleBox.classList.add("hidden");
    const temp = visibleBox;
    visibleBox = hiddenBox;
    hiddenBox = temp;
}
setGradient(box1, 0);
setGradient(box2, 1);
box2.classList.add("hidden");
setOverlayGradient(0);
setOverlay2Gradient(0);
setInterval(updateColors, 15);
}
