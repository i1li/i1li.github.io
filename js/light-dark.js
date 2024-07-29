
// Light / Dark
function applyDarkMode(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.querySelectorAll('a, .article-content, .article-content-wrapper, #bg-wrapper, #draw').forEach((element) => {
    element.classList.toggle('dark-mode', isDarkMode);
  });
}
function toggleDarkMode() {
  darkMode = !darkMode;
  applyDarkMode(darkMode);
  localStorage.setItem('darkMode', darkMode);
}
let darkMode;
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const savedMode = localStorage.getItem('darkMode');
if (savedMode !== null) {
  darkMode = savedMode === 'true';
} else if (userPrefersDark) {
  darkMode = true;
} else if (userPrefersLight) {
  darkMode = false;
} else {
  darkMode = true;
}
applyDarkMode(darkMode);
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', toggleDarkMode);
