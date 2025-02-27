<h1 align="center">Minimal, Responsive, Pure JavaScript, Single Page App</h1>
<h4>Layman's Summary ("TLDR"):</h4> A lightweight framework, providing features similar to blogging platforms like WordPress, custom coded from scratch to provide extra features without depending on anything external beyond the code contained here. This enables simple deployment to any web hosting platform. Single Page App (SPA) functionality means all of the actual content is in the `index.html` file, while allowing the user to navigate to different pages within the site that each have their own web address, even though all of their content is loaded from `index.html`, instead of each having their own `.html` file, which would require loading a new page at each navigation step. This means the entire website is loaded at first view by the user.<br><br>

Typically the features detailed below require a relatively unbearable amount of complexity and dependencies if implemented with other platforms, where extensions and customizations require extra paid add-ons and/or advanced platform-specific knowledge, and are prone to cause conflicts between features that result in broken functionality.<br>

My favorite features are the <a href="#Lightest YouTube Embed">custom video embed</a>, combined with custom <a href="#shuffle.js">shuffle functions</a>, allowing for practically unlimited amount of video embeds because none use any resources until clicked. The shuffle function means that on every page load, thousands of videos in playlists are given a new shuffle without even noticably affecting page load time. Also, on non-mobile devices there's custom random color change functions for the <a href="#Background Gradient Shift, & other CSS Effects">background and different page elements</a>. Read on for more:
<h4>Features:</h4>
<p align="center">
<a href="#Efficiency & Minimalism">Minimal, no frameworks</a>, just pure JavaScript (a.k.a. vanilla JavaScript), CSS, & HTML, <a href="#SPA Navigation & Content Loading">Single Page App (SPA)</a> <br/><a href="#Responsive Design">Responsive Design</a>: images, video, & text automatically adjust to fit accordingly across small & large screens. <br/><a href="#Light/Dark Mode Toggle">Light/Dark Mode</a>, <a href="#Zoom In/Out Functionality">Page Zoom</a>, <a href="#Full Screen Image Overlay">Full Screen Image Overlay</a>, <a href="#Sticky Header & Scroll-to-Top Button">Go to Top Button</a>, <a href="#Lightest YouTube Embed">Embedded Content Display Toggle</a>, <br/><a href="#Target Links / Hash Links As Subpages">Target Links as Subpages</a>, <a href="#Background Gradient Shift, & other CSS Effects">Custom CSS Color-Shifting Gradients</a>, <a href="#Lazy Loading">Lazy Loading</a>, <a href="#Device Detection">Device Detection</a>, <a href="#Automatic External Links Handling">External Link Handling</a>.<br/>
<a href="https://github.com/codespaces/new?repo=https://github.com/i1li/i1li.github.io"><img src="dist/img/button-codespaces.svg" alt="Open in GitHub Codespaces"></a>
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/i1li/i1li.github.io"><img src="dist/img/button-netlify.svg" alt="Deploy to Netlify"></a>
<a href="https://vscode.dev/github/i1li/i1li.github.io"><img src="dist/img/button-vscode.svg" alt="Open in VSCode"></a><br/>
<a href="https://y0.netlify.app/">Demo site</a> contains my personal writing & learning resources.<br/>

Quickstart: Use a quick deploy button above, or clone this repo locally, open a terminal in the project directory, & enter the following:
```javascript
npm i express dotenv
node serv.js
```
This serves the files from `/dist` which are created by `build.js`. If you'd like to test changes you made without running the build script, run the following to serve the files from `/src`:

```javascript
node serv.js dev
```

<h3 id="SPA Navigation & Content Loading">SPA Navigation & Content Loading</h3>

- [spa.js](/src/js/spa.js) For SPA (Single Page App) routing across different hosting environments, the app uses [netlify.toml](/netlify.toml) on Netlify, or 
- [404.html](/404.html) & [github-pages.js](/src/js/github-pages.js) on [GitHub Pages](https://i1li.github.io/), or
- [serv.js](/serv.js) elsewhere.
- Enables seamless navigation within the application without full page reloads, improving user experience without complication of a framework.
- Default "display all posts" view at root directory, with posts auto-expanding upon scroll, shows a welcome intro message & navigation links at top of page.
- Individual post view at unique URLs removes the welcome intro from display, & autoscrolls post header to top. Also clones a copy of the post navigation links shown in the post header, to the bottom of post.
- Manages browser history & navigation state using the History API (`history.pushState`, `history.replaceState`, & `window.onpopstate`), allowing for bookmarkable URLs & functional forward/backward navigation.
- Updates browser URL as user scrolls through posts with `updateURLonScroll` function
- Implements custom logic to show/hide content based on the current navigation state, simulating the behavior of a multi-page application within a single HTML document.

<h3 id="Target Links / Hash Links As Subpages">Target Links / Hash Links As Subpages</h3>

- Allows proper permalinks for specific areas of posts (target links, a.k.a. hashlinks or subpages), so they get a url of /route/target instead of /route#target
- [Demo at /edu/mind](https://y0.netlify.app/edu/mind)

<h3 id="Lightest YouTube Embed"><a href="https://github.com/i1li/lightest-youtube-embed">Lightest Youtube Embed</a> - (<a href="/src/yt/youtube-embed.js">youtube-embed.js</a>)</h3>

- Easy to use YouTube embed that saves space, bandwidth, & privacy. With a bare amount of code (`<y-t v="videoid"></y-t>`), it responsively fits videos & playlists that only load once user clicks play button. [Demo at /edu](https://y0.netlify.app/edu/)
- Includes a remote control function at bottom right of page, allowing quick media control while navigating throughout the site.
- Automatically stops any current playing videos if user clicks play on another video.

<h3 id="Simple Toggle (display-toggle.js)"><a href="/src/js/display-toggle.js">Simple Toggle (display-toggle.js)</a></h3>

- Stripped version of Lightest Youtube Embed to toggle display of any iframe or other content. [Demo at /jesus-and-his-religion](https://y0.netlify.app/jesus-and-his-religion/)

### [yt-titles.js](/yt/yt-titles.js)
- Updates all `<y-t>` elements on the page,  `<y-t v="YouTube Video ID">` becomes `<y-t v="YouTube ID" t="The Video's Title">` To use, open a terminal in the project directory, & enter:
```javascript
node yt-titles.js
```

### [yt-ids.js](/yt/yt-ids.js)
- Extracts all IDs found within the 'v' attribute of `<y-t>` tags in the "music" `<div>`. 
- For playlists, it gets all the available video IDs for each, then moves the playlist ID from the 'v' attribute to 'p', listing all video IDs in the 'v' attribute.
- Accepts multiple playlist IDs per `<y-t>` element, allowing playlist combination.
- Updates the total count of video IDs found in the "music" `<div>`, inserting the total in the description of the <a href="https://y0.netlify.app/edu/vibes">"Combined Shuffled Playlist"</a> within `<span id="total-count"></span>`
- Video IDs from otherwise good playlists to exclude, for either not being available for embedding, or just not being good, can be included, comma-separated, in `exclude.txt`.
- To use, put your [API Key](https://developers.google.com/youtube/v3/getting-started#before-you-start) at `KEY=` in the `.env` file, & then open a terminal in the project directory, & enter:
```javascript
npm i dotenv
node yt-ids.js
```

<h3 id="shuffle.js"><a href="/yt/shuffle.js">shuffle.js</a></h3>

- proccessAndCombine combines all video IDs, (limiting how many come from each playlist), from the music section into one `<y-t>` element, at the top of [/edu/vibes](https://y0.netlify.app/edu/vibes).
- shuffleAndDraw shuffles an array of playlists & videos extracted from the music section, with its own 'next' button. It then "draws" from the shuffled array, cloning the drawn `<y-t>` element into the 'draw' `<div>`. [Demo at top of main page](https://y0.netlify.app/)
- The order of the elements is shuffled at each page load, as well as the video IDs within each element.
- Limited to the `<div>` with id "music" so only music is included and playlist order is preserved in other sections of the site.
- Since shuffled playlists are constructed with each video ID in the URL, there is a limit of 150 per playlist, although each shuffle picks from the entire list of video IDs (in this case about 20,000 for the combined playlist)
<details><summary>More info on the shuffle function</summary>
The hybrid shuffle function combines two different techniques to optimize performance for a wide range of input array sizes. The first is the "Knuth Shuffle" (a.k.a. "Durstenfeld Shuffle"), which has a time complexity of O(n * log n), where n is the size of the input array. This is a variation of the Fisher-Yates shuffle algorithm that is optimized for small arrays. For larger arrays, the function uses the standard Fisher-Yates shuffle algorithm, which has a time complexity of O(n), where n is the size of the input array. The decision to use which shuffle method, is based on the size of the input array in relation to the limit parameter (limit is how many items are used from the array after shuffling): If the array length is less than limit * 2, the Knuth Shuffle is used. If the array length is greater than or equal to limit * 2, the Fisher-Yates Shuffle is used.</details>

<h3 id="Light/Dark Mode Toggle">Light/Dark Mode Toggle</h3>

- [light-dark.js](/src/js/light-dark.js) Allows users to switch between light & dark themes, enhancing accessibility & user preference.
- Utilizes `window.matchMedia` to detect & respect the system's preferred color scheme, & `localStorage` to persist the user's theme choice across sessions.

<h3 id="Zoom In/Out Functionality">Zoom In/Out Functionality</h3>
  
- [zoom.js](/src/js/zoom.js) Provides users with the ability to adjust the text size for better readability.
- Dynamically adjusts the font size of key elements on the page based on user interaction, with the zoom level persisted in `localStorage`.

<h3 id="Full Screen Image Overlay"><a href="/src/js/image-overlay.js">Full Screen Image Overlay (image-overlay.js)</a></h3>

- Responsive full screen overlay when user clicks to expand image. Exits by clicking anywhere, pressing any key, or clicking "x"

<h3 id="Background Gradient Shift, & other CSS Effects">Background Gradient Shift, & other CSS Effects</h3>

- [background.js](/src/js/background.js) & [background.css](/src/css/background.css) create a constantly shifting, full-spectrum gradient.
- Several layers of semi-transparent gradients for background & page elements.
- Dynamic cursor hover & filter effects.
- [color-change.js](/src/js/color-change.js) - Random color on hover, click, or touch of links and buttons. Also shifts colors of other elements at randomly varying rate, regardless of hover.

<h3 id="Sticky Header & Scroll-to-Top Button">Sticky Header & Scroll-to-Top Button</h3>

- [scroll.js](/src/js/scroll.js) Improves navigation & accessibility by providing a sticky header & a convenient way to return to the top of the page.  
- The sticky header adjusts its style based on the scroll position, becoming more compact as the user scrolls down.
- A "scroll to top" button appears after scrolling down, allowing quick return to the top of the page with a single click.

<h3 id="Custom Build Script">Custom Build Script</h3>

- [build.js](build.js) minifies and bundles files from /src to /dist
To use:
 ```javascript
npm i esbuild
node build.js
```

<h3 id="Responsive Design">Responsive Design</h3>

- Responsive container styling with automatic margin and maximum width adjustments based on screen size (.container with various @media queries)
- Get the performance of Bootstrap, minus the bloat and complication.

<h3 id="Lazy Loading">Lazy Loading</h3>

- Uses the `IntersectionObserver` API for lazy loading content as it becomes visible, reducing initial load time.
- This gives the main view at the root URL an infinite scroll for all posts.

<h3 id="Device Detection">Device Detection</h3>

- [detect-mobile.js](/src/js/detect-mobile.js) - Detects when the page is loaded from a mobile device, to save processing power from being used on extra effects that are less likely to work on mobile devices, like in [background.js](/src/js/background.js) and [color-change.js](/src/js/color-change.js)

<h3 id="Automatic External Links Handling">Automatic External Links Handling</h3>

- Identifies & handles external links to ensure they open in a new tab, preserving SPA integrity.
- Checks the URL of clicked links & sets them to open in a new tab if they lead outside the current domain, using `target="_blank"` & `rel="noreferrer"` for privacy & security.

<h3 id="Netlify Content Gate"><a href="https://github.com/i1li/netlify-content-gate">Netlify Content Gate</a></h3>

- Easy solution for an email-verified contact form, and simple free content gating. Kept on a [separate site](https://connect4more.netlify.app/) for simplicity in this case, but easily integrated.

<h3 id="Efficiency & Minimalism">Efficiency & Minimalism</h3>

- The code demonstrates efficient use of native JavaScript APIs to achieve functionality often reliant on external libraries, showcasing a minimalist approach that reduces load times & dependency overhead.
- By combining CSS class toggles, native browser APIs, & simple event handling, it achieves a responsive, user-friendly SPA experience with minimal code.

This SPA implementation is a testament to the power of modern JavaScript & browser capabilities, allowing full-featured creation of rich, interactive web applications without any reliance on frameworks or libraries.
