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

// Full Screen Image Overlay
let imgOverlay = document.getElementById("fullScreenOverlay");
function openImageOverlay(imageSource) {
  let overlayImage = document.getElementById("overlayImage");
  imgOverlay.style.display = "block";
  overlayImage.src = imageSource;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeImageOverlay);
}
function closeImageOverlay() {
  imgOverlay.style.display = "none";
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', closeImageOverlay);
}

//zoom
document.addEventListener("DOMContentLoaded", function() {
const savedFontSize = localStorage.getItem('baseFontSize');
if (savedFontSize) {
  document.documentElement.style.fontSize = savedFontSize + 'px';
}
});
function pageZoom(isZoomIn) {
  const zoomFactor = isZoomIn ? 1.05 : 0.95;
  const zoom = document.querySelectorAll("html");
  zoom.forEach(function(element) {
    let currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    currentFontSize = currentFontSize * zoomFactor;
    element.style.fontSize = currentFontSize + "px";
  });
  const baseFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  localStorage.setItem('baseFontSize', baseFontSize);
}

//light/dark mode
function applyDarkMode(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.querySelectorAll('*').forEach((element) => {
    element.classList.toggle('dark-mode', isDarkMode);
  });
}
let darkMode;
function toggleDarkMode() {
  darkMode = !darkMode;
  applyDarkMode(darkMode);
  localStorage.setItem('darkMode', darkMode);
}
document.addEventListener("DOMContentLoaded", function() {
const savedMode = localStorage.getItem('darkMode');
if (savedMode !== null) {
  darkMode = savedMode === 'true';
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkMode = true;
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  darkMode = false;
} else {
  darkMode = true;
}
applyDarkMode(darkMode);
});

// Simple Embedded Content Toggle
class SimpleToggle extends HTMLElement {
    constructor() {
      super();
      this.button = document.createElement('button');
      this.button.textContent = '▶️ Play';
      this.button.title = 'Play Content';
      this.button.className = 'showHideButton';
      this.button.onclick = () => this.toggleContent();
      this.content = document.createElement('div');
      this.content.style.display = 'none';
      this.template = document.createElement('template');
      this.template.innerHTML = this.getAttribute('c');
      this.append(this.button, this.content);
    }
    toggleContent() {
      if (this.content.style.display === 'none') {
        this.content.appendChild(this.template.content.cloneNode(true));
        this.content.style.display = 'block';
        this.button.textContent = '⏹️ Stop';
        this.button.title = 'Stop Content';
      } else {
        this.content.innerHTML = '';
        this.content.style.display = 'none';
        this.button.textContent = '▶️ Play';
        this.button.title = 'Play Content';
      }
    }
  }
customElements.define('s-t', SimpleToggle);

//basic search
function searchSPA() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const results = document.getElementById('searchResults');
  results.innerHTML = '';
  if (!query) {results.innerHTML='<p>Enter a search term</p>';results.style.display='block';return;}
  if (query.length < 3) {results.style.display='none';return;}
  results.style.display = 'block';
  let hasResults = false;
  document.querySelectorAll('article').forEach(article => {
    const clone = article.cloneNode(true);
    clone.querySelectorAll('button').forEach(b => b.remove());
    clone.querySelectorAll('nav').forEach(b => b.remove());
    const text = clone.textContent.toLowerCase();
    if (!text.includes(query)) return;
    hasResults = true;
    const title = article.querySelector('h1,h2,h3')?.textContent || 'Untitled Article';
    const id = article.id || '';
    const i = text.indexOf(query);
    const excerpt = text.slice(Math.max(0,i-50), i+query.length+50);
    const highlighted = excerpt.replace(new RegExp(query,'gi'), m=>`<strong>${m}</strong>`);
    results.insertAdjacentHTML('beforeend', `
      <div class="search-result">
        <h3>${id ? `<a href="/${id}" class="search-result-link">` : ''}${title}${id ? '</a>' : ''}</h3>
        <p>...${highlighted}...</p>
      </div>
    `);
  });
  results.querySelectorAll('.search-result-link').forEach(link =>
    link.addEventListener('click', closeSearchOverlay)
  );
  if (!hasResults) results.innerHTML = '<p>No results found.</p>';
}
function handleKeyPress(e) {if (e.key === "Escape") closeSearchOverlay();}
function openSearchOverlay() {
  document.getElementById("searchOverlay").style.display = "block";
  document.getElementById("searchInput").focus();
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleKeyPress);
  searchSPA();
}
function closeSearchOverlay() {
  document.getElementById("searchOverlay").style.display = "none";
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', handleKeyPress);
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}
document.getElementById('searchInput').addEventListener('input', throttle(() => search(), 500));
