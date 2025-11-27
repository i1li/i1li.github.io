const savedFontSize = localStorage.getItem('baseFontSize');
if (savedFontSize) {
  document.documentElement.style.fontSize = savedFontSize + 'px';
}
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
