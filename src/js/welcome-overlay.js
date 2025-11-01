const welcomeOverlay = document.getElementById('welcome-overlay');
const welcomeDuration = 5000;
const frameDuration = 100;
const totalFrames = Math.ceil(welcomeDuration / frameDuration);
let currentFrame = 0;

function easeInExpo(t) {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
}

const intervalId = setInterval(() => {
  currentFrame++;
  const progress = Math.min(currentFrame / totalFrames, 1);
  const opacity = 1 - easeInExpo(progress);
  welcomeOverlay.style.opacity = opacity.toFixed(3);

  if (progress >= 1) {
    clearInterval(intervalId);
    welcomeOverlay.style.display = 'none';
    welcomeOverlay.style.pointerEvents = 'none';
    isInitialLoad = false;
  }
}, frameDuration);
