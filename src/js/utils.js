let isWindowActive = !document.hidden;
const isMobile = (window.matchMedia("(orientation: portrait)").matches) || (window.innerHeight > window.innerWidth) ||
/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone|kindle|playbook|silk|mobile|tablet|samsung|lg|htc|nokia|motorola|symbian|fennec|maemo|tizen|blazer|series60|ucbrowser|bada|micromessenger|webview/.test(navigator.userAgent.toLowerCase());
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, Math.max(0, limit - (Date.now() - lastRan)));
    }
  }
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
const permutation = [...Array(256)].map(() => Math.floor(Math.random() * 256));
const p = [...permutation, ...permutation];
function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t, a, b) { return a + t * (b - a); }
function grad(hash, x) {
  const h = hash & 15;
  const grad = 1 + (h & 7);
  return (h & 8 ? -grad : grad) * x;
}
function noise(x) {
  const X = Math.floor(x) & 255;
  x -= Math.floor(x);
  const u = fade(x);
  return lerp(u, grad(p[X], x), grad(p[X+1], x-1));
}
function easeWithNoise(t, noiseScale = Math.random(), noiseAmplitude = Math.random() / 3) {
  const easedT = easeInOutCubic(t);
  const noiseValue = noise(t * noiseScale) * noiseAmplitude;
  return Math.max(0, Math.min(1, easedT + noiseValue));
}
