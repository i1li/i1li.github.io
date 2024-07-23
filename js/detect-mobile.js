// Detect if user is viewing from mobile device
function detectMobile() {
  const isMobile = (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) ||
                   (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) ||
                   /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone|kindle|playbook|silk|mobile|tablet|samsung|lg|htc|nokia|motorola|symbian|fennec|maemo|tizen|blazer|series60|ucbrowser|bada|micromessenger|webview/.test(navigator.userAgent.toLowerCase());
  return !isMobile;
}
