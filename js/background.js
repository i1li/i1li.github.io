// Only run this code on non-mobile devices
if (detectMobile()) {
    const box1 = document.getElementById("box1");
    const box2 = document.getElementById("box2");
    const overlay = document.getElementById("overlay");
    const overlay2 = document.getElementById("overlay2");
    let hueIndex = 0;
    let visibleBox = box1;
    let hiddenBox = box2;
    function getAdjustedHue(index, adjustment) {
        return (index + adjustment + 360) % 360;
    }
    function setGradient(box, index) {
        const topLeft = `hsl(${index}, 100%, 50%)`;
        const topRight = `hsl(${getAdjustedHue(index, 90)}, 100%, 50%)`;
        const bottomRight = `hsl(${getAdjustedHue(index, 180)}, 100%, 50%)`;
        const bottomLeft = `hsl(${getAdjustedHue(index, 270)}, 100%, 50%)`;
        const width = box.offsetWidth;
        const height = box.offsetHeight;
        const diagonal = Math.sqrt(width * width + height * height);
        const percentage = (diagonal / (Math.max(width, height) * Math.sqrt(2))) * 100;
        const gradient = `
            radial-gradient(ellipse farthest-corner at 0 0, ${topLeft}, transparent ${percentage}%),
            radial-gradient(ellipse farthest-corner at 100% 0, ${topRight}, transparent ${percentage}%),
            radial-gradient(ellipse farthest-corner at 100% 100%, ${bottomRight}, transparent ${percentage}%),
            radial-gradient(ellipse farthest-corner at 0 100%, ${bottomLeft}, transparent ${percentage}%)
        `;
        box.style.backgroundImage = gradient;
    }    
    function setOverlayGradient(index) {
        const adjustedIndex = getAdjustedHue(index);
        const gradient = `conic-gradient(from 0deg, hsl(${adjustedIndex}, 100%, 50%) 0deg, transparent 180deg, transparent 360deg)`;
        overlay.style.backgroundImage = gradient;
    }
    function setOverlay2Gradient(index) {
        const adjustedIndex = getAdjustedHue(index, 180);
        const gradient = `conic-gradient(from 180deg, hsl(${adjustedIndex}, 100%, 50%) 0deg, transparent 180deg, transparent 360deg)`;
        overlay2.style.backgroundImage = gradient;
    }
    function updateColors() {
        hueIndex = (hueIndex + 1) % 360;
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
    setGradient(box2, 180);
    box2.classList.add("hidden");
    setOverlayGradient(0);
    setOverlay2Gradient(0);
    setInterval(updateColors, 33);
}
