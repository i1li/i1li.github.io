// Detect if user is viewing from mobile device
function detectMobile() {
  const isMobile = (window.matchMedia("(orientation: portrait)").matches) || 
                     (window.innerHeight > window.innerWidth) ||
                   /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone|kindle|playbook|silk|mobile|tablet|samsung|lg|htc|nokia|motorola|symbian|fennec|maemo|tizen|blazer|series60|ucbrowser|bada|micromessenger|webview/.test(navigator.userAgent.toLowerCase());
  return !isMobile;
}
