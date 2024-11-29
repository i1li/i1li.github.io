function applyDarkMode(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.querySelectorAll('*').forEach((element) => {
    element.classList.toggle('dark-mode', isDarkMode);
  });
}
function toggleDarkMode() {
  darkMode = !darkMode;
  applyDarkMode(darkMode);
  localStorage.setItem('darkMode', darkMode);
}
let darkMode;
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
const modeToggle = document.getElementById('dark-light');
modeToggle.addEventListener('click', toggleDarkMode);
