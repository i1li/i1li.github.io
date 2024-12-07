const welcomeOverlay = document.getElementById('welcome-overlay');
const welcomeDuration = 3000;
const welcomeInitialOpacity = .98
function easeInExpo(t) {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
}
function animateOverlay(startTime) {
  const now = performance.now();
  const elapsedTime = now - startTime;
  const progress = Math.min(elapsedTime / welcomeDuration, 1);
  if (progress < 1) {
      const opacity = welcomeInitialOpacity - easeInExpo(progress);
      welcomeOverlay.style.opacity = opacity.toFixed(3);
      requestAnimationFrame(() => animateOverlay(startTime));
  } else {
      welcomeOverlay.style.display = 'none';
      welcomeOverlay.style.pointerEvents = 'none';
      isInitialLoad = false;
  }
}
