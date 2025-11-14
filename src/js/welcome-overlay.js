const welcomeOverlay = document.getElementById('welcome-overlay');
const welcomeDuration = 5000;
const frameDuration = 100;
const totalFrames = Math.ceil(welcomeDuration / frameDuration);
let currentFrame = 0;

// Precompute easing curve values
const easingCurve = new Float32Array(totalFrames);
for (let i = 0; i < totalFrames; i++) {
  const t = i / totalFrames;
  const progress = t === 0 ? 0 : Math.pow(2, 10 * t - 10);
  easingCurve[i] = 1 - progress;
}

const intervalId = setInterval(() => {
  currentFrame++;
  if (currentFrame <= totalFrames) {
    welcomeOverlay.style.opacity = easingCurve[currentFrame - 1].toFixed(3);
  }

  if (currentFrame >= totalFrames) {
    clearInterval(intervalId);
    welcomeOverlay.style.display = 'none';
    welcomeOverlay.style.pointerEvents = 'none';
    isInitialLoad = false;
  }
}, frameDuration);
