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
  const savedFontSize = localStorage.getItem('baseFontSize');
  if (savedFontSize) {
    document.documentElement.style.fontSize = savedFontSize + 'px';
  }
document.getElementById("zoom-in").addEventListener("click", function() {
  pageZoom(true);
});
document.getElementById("zoom-out").addEventListener("click", function() {
  pageZoom(false);
});
