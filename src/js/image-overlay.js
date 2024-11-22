// Full Screen Image Overlay
function openOverlay(imageSource) {
  var overlay = document.getElementById("fullScreenOverlay");
  var overlayImage = document.getElementById("overlayImage");
  overlay.style.display = "block";
  overlayImage.src = imageSource;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', closeOverlay);
}
function closeOverlay() {
  var overlay = document.getElementById("fullScreenOverlay");
  overlay.style.display = "none";
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', closeOverlay);
}
var images = document.querySelectorAll('img:not(.img-footer,.img-header,.to-top,.no-overlay)');
images.forEach(function(img) {
  img.addEventListener('click', function() {
    openOverlay(this.src);
  });
});
