
[Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=https://github.com/i1li/i1li.github.io)[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/i1li/i1li.github.io)[![![Open in VSCode](https://img.shields.io/badge/Open%20in%20VSCode-5C2D91.svg?style=flat-square&logo=visual-studio-code&logoColor=white)](https://vscode.dev/redirect?url=github%3A//https://github.com/i1li/i1li.github.io)
# Minimal, Responsive, Pure JavaScript, Single Page App
No frameworks, just pure JavaScript (a.k.a. vanilla JavaScript), CSS, & HTML. Responsive containers, images, video, & text automatically adjust to fit accordingly across small & large screens. Minimal, Single Page App, light/dark, zoom in/out, full screen image overlay, go to top, lazy loading, embedded content display toggle, target links as subpages (page/target instead of page#target)

[Demo site](https://y0.netlify.app/) contains my personal writing, feel free to fork this repo & use it as a template.

Quickstart: Open a terminal in the project directory, & enter either:
```bash
npm i express
node serv.js
```
or:
```bash
npm i netlify-cli
netlify dev
```

Default "display all posts" view at root directory, with posts auto-expanding upon scroll, shows a welcome intro message, plus navigation links.

Individual post view at unique URLs removes the welcome intro from display, & autoscrolls post header to top. Also clones a copy of the post navigation links shown in the post header, to the bottom of post.

### Light/Dark Mode Toggle
-   Allows users to switch between light & dark themes, enhancing accessibility & user preference.
-   Utilizes `localStorage` to persist the user's theme choice across sessions and `window.matchMedia` to detect & respect the system's preferred color scheme.

### Zoom In/Out Functionality
-   Provides users with the ability to adjust the text size for better readability.
-   Dynamically adjusts the font size of key elements on the page based on user interaction, with the zoom level persisted in `localStorage`.

### Full Screen Image Overlay
-   Responsive full screen overlay when user clicks to expand image, exits by clicking anywhere, pressing any key, or clicking "x"

### SPA Navigation & Content Loading
-   Uses `netlify.toml` for hosting on Netlify, or `404.html` & `gh.js` for hosting on [GitHub Pages](https://i1li.github.io/). The later is a workaround for SPA support that uses redirects, thus is [not ideal for SEO](https://github.com/rafgraph/spa-github-pages#seo).
-   Enables seamless navigation within the application without full page reloads, improving the user experience.
-   Uses the `IntersectionObserver` API for lazy loading content as it becomes visible, reducing initial load time.
-   Manages browser history & navigation state using the History API (`history.pushState` & `window.onpopstate`), allowing for bookmarkable URLs & functional forward/backward navigation.
-   Implements custom logic to show/hide content based on the current navigation state, simulating the behavior of a multi-page application within a single HTML document.

### Target Links As Subpages
-   Allows proper permalinks for specific areas of posts (target links, a.k.a. subpages), so they get a url of post/target instead of post#target
-   [Demo at /edu/psychology](https://y0.netlify.app/edu/psychology)

### [Lightest Youtube Embed](https://github.com/i1li/lightest-youtube-embed) - ([yt.js](https://github.com/i1li/i/blob/main/js/yt.js))
Easy to use YouTube embed that saves space, bandwidth, & privacy. With a bare amount of code (`<y-t v="videoid"></y-t>`), it responsively fits videos & playlists that only load once user clicks "show/hide" button. [Demo at /edu](https://y0.netlify.app/edu/)

### [Simple Toggle (toggle.js)](https://github.com/i1li/i/blob/main/js/toggle.js)
Stripped version of Lightest Youtube Embed to toggle display of any iframe or other content. [Demo at /jesus-and-his-religion](https://y0.netlify.app/jesus-and-his-religion/)

### [yt-titles.js](https://github.com/i1li/i/blob/main/yt-titles.js)
Updates all `<y-t>` elements on the page,  `<y-t v="Your Video ID">` becomes `<y-t v="Your Video ID" t="The Video's Title">` To use, open a terminal in the project directory, & enter:
```bash
npm i axios
node yt-titles.js
```

### [yt-ids.js](https://github.com/i1li/i/blob/main/yt-id.js)
- Extracts all IDs found within the v attribute of `<y-t>` tags. 
- For playlists, it gets all the available video IDs for each, then moves the playlist ID from the v attribute to p, listing all video IDs in the v attribute. To use, put your [API Key](https://developers.google.com/youtube/v3/getting-started#before-you-start) in the empty quotes at `const KEY = ""`, & then open a terminal in the project directory, & enter:
```bash
npm i axios
node yt-ids.js
```

### [shuffle.js](https://github.com/i1li/i/blob/main/js/shuffle.js)
- proccessAndCombine combines all video IDs, (limiting how many come from each playlist), from the music section into one `<y-t>` element, at the top of [/edu/music](https://y0.netlify.app/edu/music).
- shuffleAndDraw shuffles an array of playlists & videos extracted from the music section, with its own 'next' button. It then "draws" from the shuffled array, cloning the `<y-t>` element into the 'draw' `<div>`. [Demo at top of main page](https://y0.netlify.app/)
- The order of the elements is shuffled at each page load, as well as the video IDs within each element.
- Limited to specific divs so playlist order is preserved in other sections of the site.
- Since shuffled playlists are constructed with each video ID in the URL, there is a limit of 150 per playlist, although each shuffle picks from the entire list of video IDs (in this case several thousand for the combined playlist)

The shuffle function combines two different shuffle techniques to optimize performance for a wide range of input array sizes. The first shuffle technique used is the "Knuth Shuffle" or "Durstenfeld Shuffle". This is a variation of the Fisher-Yates shuffle algorithm that is optimized for small arrays. For larger arrays, the function uses the standard Fisher-Yates shuffle algorithm. The decision to use which shuffle method, is based on the size of the input array in relation to the limit parameter (limit is how many items are used from the array after shuffling): If the array length is less than limit * 2, the Knuth Shuffle is used. If the array length is greater than or equal to limit * 2, the Fisher-Yates Shuffle is used.

### Background Gradient Shift, & other CSS Effects
-   `bg.js` & `bg.css` create a constant shifting gradient by creating & replacing blended layers.
-   Several layers of semi-transparent gradients for background & page elements.
-   Dynamic cursor hover & filter effects.

### [Netlify Content Gate](https://github.com/i1li/netlify-content-gate)
Custom solution for a simple free content gating. Kept on a separate site for simplicity in this case, but easily integrated.

### Sticky Header & Scroll-to-Top Button
-   Improves navigation & accessibility by providing a sticky header & a convenient way to return to the top of the page.    
-   The sticky header adjusts its style based on the scroll position, becoming more compact as the user scrolls down.
-   A "scroll to top" button appears after scrolling down, allowing users to quickly return to the top of the page with a single click.

### Automatic External Links Handling
-   Identifies & handles external links to ensure they open in a new tab, preserving SPA integrity.
-   Checks the URL of clicked links & sets them to open in a new tab if they lead outside the current domain, using `target="_blank"` and `rel="noreferrer"` for privacy & security.

### Efficiency & Minimalism
-   The code demonstrates efficient use of native JavaScript APIs to achieve functionality often reliant on external libraries, showcasing a minimalist approach that reduces load times & dependency overhead.
-   By combining CSS class toggles, native browser APIs, & simple event handling, it achieves a responsive, user-friendly SPA experience with minimal code.

This SPA implementation is a testament to the power of modern JavaScript & browser capabilities, allowing easy creation of rich, interactive web applications without any reliance on frameworks or libraries.
