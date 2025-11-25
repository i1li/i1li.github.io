let isInitialLoad = true;//used in spa.js to prevent scrollIntoView conflict
document.body.style.overflow = 'hidden';
const welcomeDuration = 4500;
const delayOtherResources = welcomeDuration - 200;
const delayOtherResources2 = welcomeDuration - 100;
const frameDuration = 50;
const totalFrames = Math.ceil(welcomeDuration / frameDuration);
const scrollbarIntroFrame = Math.floor(totalFrames * 0.7);
const easingCurve = new Float32Array(totalFrames);
for (let i = 0; i < totalFrames; i++) {
  const t = i / totalFrames;
  const progress = t === 0 ? 0 : Math.pow(2, 10 * t - 10);
  easingCurve[i] = 1 - progress;
}
const welcomeOverlay = document.getElementById('welcome-overlay');
let currentFrame = 0;
const intervalId = setInterval(() => {
  currentFrame++;
  if (currentFrame <= totalFrames) {
    welcomeOverlay.style.opacity = easingCurve[currentFrame - 1].toFixed(3);
  }
  if (currentFrame >= scrollbarIntroFrame) {
    document.body.style.overflow = 'auto';
  }
  if (currentFrame >= totalFrames) {
    clearInterval(intervalId);
    welcomeOverlay.style.display = 'none';
    isInitialLoad = false;
  }
}, frameDuration);
