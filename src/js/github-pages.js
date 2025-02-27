// Single Page Apps for GitHub Pages
// MIT License
// https://github.com/rafgraph/spa-github-pages
// This script checks to see if a redirect is present in the query string,
// which is generated by the script in 404.html, then
// converts it back into the correct url and adds it to the
// browser's history using window.history.replaceState(...),
// which won't cause the browser to attempt to load the new url.
// When the single page app is loaded further down in index.html,
// the correct url will be waiting in the browser's history for
// the single page app to route accordingly.

// Updated to modern syntax in 2024 for https://github.com/i1li/i
if (window.SPA404Redirect) {
  const decoded = window.SPA404Redirect.search.slice(1).split('&').map(s => s.replace(/~and~/g, '&')).join('?');
  const newUrl = window.SPA404Redirect.origin + window.SPA404Redirect.pathname.slice(0, -1) + decoded + window.SPA404Redirect.hash;
  window.history.replaceState(null, null, newUrl);
  delete window.SPA404Redirect;
}
