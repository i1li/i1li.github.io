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
  let lastFunc; let lastRan;
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

let isWindowActive = !document.hidden;
let lastUpdateTime = performance.now();
const updateWindowStatus = throttle(() => {
  const wasActive = isWindowActive;
  isWindowActive = !document.hidden || document.hasFocus();
  if (isWindowActive && !wasActive) {
    lastUpdateTime = performance.now();
  }
}, 500);
window.addEventListener('focus', updateWindowStatus);
window.addEventListener('blur', updateWindowStatus);
document.addEventListener('visibilitychange', updateWindowStatus);

function shuffle(array, limit = Infinity) {
  if (array.length === 1) { return array; } else
  if (array.length < Math.min(limit * 2, array.length)) {
    const result = [];
    const indices = new Set();
    while (indices.size < Math.min(limit, array.length)) {
      const randomIndex = Math.floor(Math.random() * array.length);
      indices.add(randomIndex);
    }
    for (const index of indices) {result.push(array[index]);}
    return result;
  } else {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, Math.min(limit, array.length));
  }
}

const random = (min, max) => Math.random() * (max - min) + min;
const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const easingFunctions = [
  (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // easeInOutCubic
  (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // easeInOutQuad
  (t) => t < 0.5 ? (1 - Math.sqrt(1 - 4 * t * t)) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2, // easeInOutCirc
  (t) => -(Math.cos(Math.PI * t) - 1) / 2, // easeInOutSine
  // easeInOutExpo
  (t) => t === 0 ? 0 : t === 1 ? 1 : 
    t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : 
    (2 - Math.pow(2, -20 * t + 10)) / 2,
  // easeInOutElastic
  (t) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 :
      t < 0.5 ? 
        -(Math.pow(2, 20 * t - 10) * Math.sin((t * 2 - 1.075) * c5)) / 2 :
        (Math.pow(2, -20 * t + 10) * Math.sin((t * 2 - 0.075) * c5)) / 2 + 1;
  },
];

const noiseFunctions = [
  (x) => perlinNoise(x),
  (x) => Math.sin(x * 10) * 0.5 + 0.5, // Sine wave noise
  (x) => Math.exp(-Math.pow(x - 0.5, 2) / 0.05), // Gaussian curve
  (x) => Math.pow(Math.sin(x * Math.PI), 3), // Cubic sine wave
];

function metaRecursiveEaseNoise(t, depth = 0, maxDepth = Math.ceil(Math.random() * 300) + 33) {
  if (depth >= maxDepth) {
    const randomEase = easingFunctions[Math.floor(Math.random() * easingFunctions.length)];
    return randomEase(t);
  }
  const randomEase = easingFunctions[Math.floor(Math.random() * easingFunctions.length)];
  const randomNoise = noiseFunctions[Math.floor(Math.random() * noiseFunctions.length)];
  const noiseScale = Math.random();
  const noiseAmplitude = noiseScale / random(1.5,2.5);
  const easedT = randomEase(t);
  const noiseValue = metaRecursiveNoise(t * noiseScale, depth + 1, maxDepth, randomNoise) * noiseAmplitude;
  return Math.max(0, Math.min(1, easedT + noiseValue));
}

function fade(t) { 
  return t * t * t * (t * (t * 6 - 15) + 10); 
}
function lerp(t, a, b) { 
  return a + t * (b - a); 
}
function grad(hash, x) {
  const h = hash & 15;
  const grad = 1 + (h & 7);
  return (h & 8 ? -grad : grad) * x;
}

function metaRecursiveNoise(x, depth = 0, maxDepth = random(33,111), noiseFunc) {
  if (depth >= maxDepth) {
    return noiseFunc(x);
  }
  const X = Math.floor(x) & 255;
  x -= Math.floor(x);
  const u = metaRecursiveEaseNoise(fade(x), depth + 1, maxDepth);
  return lerp(u, grad(p[X], x), grad(p[X+1], x-1));
}
