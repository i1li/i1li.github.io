# Minimal, Responsive, Pure JavaScript, Single Page App
No frameworks, just pure JavaScript (a.k.a. vanilla JavaScript), CSS, and HTML. Responsive containers, images, video, and text automatically adjust to fit accordingly across small and large screens.

[Demo site](https://y0.netlify.app/) contains my personal writing, feel free to fork this repo and use it as a template.

Default "display all posts" view at root directory, with posts auto-expanding upon scroll, shows a welcome intro message, plus navigation links.

Individual post view at unique URLs removes the welcome intro from display, and autoscrolls post header to top. Also clones a copy of the post navigation links shown in the post header, to the bottom of post.

### Light/Dark Mode Toggle

-   Allows users to switch between light and dark themes, enhancing accessibility and user preference.
-   Utilizes `localStorage` to persist the user's theme choice across sessions and `window.matchMedia` to detect and respect the system's preferred color scheme.

### Zoom In/Out Functionality

-   Provides users with the ability to adjust the text size for better readability.
-   Dynamically adjusts the font size of key elements on the page based on user interaction, with the zoom level persisted in `localStorage`.

### SPA Navigation and Content Loading

-   Enables seamless navigation within the application without full page reloads, improving the user experience.
    
-   Uses the `IntersectionObserver` API for lazy loading content as it becomes visible, reducing initial load time.
-   Manages browser history and navigation state using the History API (`history.pushState` and `window.onpopstate`), allowing for bookmarkable URLs and functional forward/backward navigation.
-   Implements custom logic to show/hide content based on the current navigation state, simulating the behavior of a multi-page application within a single HTML document.
    
### External Links Handling

-   Correctly identifies and handles external links to ensure they open in a new tab, preserving SPA integrity.
-   Checks the URL of clicked links and sets them to open in a new tab if they lead outside the current domain, using `target="_blank"` and `rel="noreferrer"` for security.

### Sticky Header and Scroll-to-Top Button

-   Improves navigation and accessibility by providing a sticky header and a convenient way to return to the top of the page.    
-   The sticky header adjusts its style based on the scroll position, becoming more compact as the user scrolls down.
-   A "scroll to top" button appears after a certain scroll threshold, allowing users to quickly return to the top of the page with a single click.

    
### Efficiency and Minimalism

-   The code demonstrates efficient use of native JavaScript APIs to achieve functionality often reliant on external libraries, showcasing a minimalist approach that reduces load times and dependency overhead.
-   By combining CSS class toggles, native browser APIs, and simple event handling, it achieves a responsive, user-friendly SPA experience with minimal code.

This SPA implementation is a testament to the power of modern JavaScript and browser capabilities, allowing easy creation of rich, interactive web applications without any reliance on frameworks or libraries.

Custom components included:
### [Lightest Youtube Embed](https://github.com/i1li/lightest-youtube-embed)
Easy to use YouTube embed that saves space, bandwidth, and privacy. With a bare amount of code, it responsively fits videos that only load once user clicks "show/hide" button.

### [Netlify Content Gate](https://github.com/i1li/netlify-content-gate)
Custom solution for a simple free content gating. Kept on a separate site for simplicity in this case, but easily integrated.

### Background Gradient Shift, and other CSS Effects
-   `bg.js` & `bg.css` create a constant shifting gradient by creating and replacing blended layers.
-   Several layers of semi-transparent gradients for background and page elements.
-   Dynamic cursor hover and filter effects.
