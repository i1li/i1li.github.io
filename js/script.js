// Sticky Header & Go to top
const scrollTransition = 50;
const header = document.getElementById('siteHeader');
const toTop = document.getElementById("toTop");
function handleScroll() {
  if (window.scrollY > scrollTransition) {
    header.classList.add('scrolled-down');
  } else {
    header.classList.remove('scrolled-down');
  }
  if (document.body.scrollTop > scrollTransition * 7 || document.documentElement.scrollTop > scrollTransition * 7) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
}
window.addEventListener('scroll', handleScroll);
function topFunction() {
  window.scrollTo(0, 0);
}

// Light / Dark
function applyDarkMode(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.querySelectorAll('a, .post-content, .post-content-wrapper, .bg-wrapper, #shuffle').forEach((element) => {
    element.classList.toggle('dark-mode', isDarkMode);
  });
}
function toggleDarkMode() {
  darkMode = !darkMode;
  applyDarkMode(darkMode);
  localStorage.setItem('darkMode', darkMode);
}
let darkMode;
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
const savedMode = localStorage.getItem('darkMode');
if (savedMode !== null) {
  darkMode = savedMode === 'true';
} else if (userPrefersDark) {
  darkMode = true;
} else if (userPrefersLight) {
  darkMode = false;
} else {
  darkMode = true;
}
applyDarkMode(darkMode);
const modeToggle = document.getElementById('mode-toggle');
modeToggle.addEventListener('click', toggleDarkMode);

// Zoom In / Out
function adjustZoom(isZoomIn) {
  const zoomFactor = isZoomIn ? 1.05 : 0.95;
  const elements = document.querySelectorAll("html");
  elements.forEach(function(element) {
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
  adjustZoom(true);
});
document.getElementById("zoom-out").addEventListener("click", function() {
  adjustZoom(false);
});

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

// Single Page Application
  const welcome = document.getElementById('welcome');
  const postContainers = document.querySelectorAll('.post-container');
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelector('.post-content').style.display = 'block';
        observer.unobserve(entry.target);
      }
    });
  });
  postContainers.forEach(function(container) {
    observer.observe(container);
    container.querySelector('.post-content').style.display = 'none';
  });
  let isInitialLoad = true;
  function showPostContent(container) {
    container.style.display = 'block';
    const postContent = container.querySelector('.post-content');
    if (postContent) {
      postContent.style.display = 'block';
    }
    const postNav = container.querySelector('.post-nav');
    if (postNav) {
      let postNavBottom = container.querySelector('.post-nav-bottom');
      if (!postNavBottom) {
        postNavBottom = postNav.cloneNode(true);
        postNavBottom.classList.add('post-nav-bottom');
        container.appendChild(postNavBottom);
      }
    }
  }
  function scrollToElement(element, isSubpost = false) {
    let offsetTop = element.getBoundingClientRect().top + window.scrollY - 45;
      if (isSubpost && isInitialLoad) {
      offsetTop = Math.round(element.getBoundingClientRect().top + ((window.scrollY / window.innerHeight) * window.scrollY));
    }
      window.scrollTo({
        top: offsetTop,
      });
    isInitialLoad = false;
  }
  function showSinglePost(postId, subpostId) {
    let targetContainer = null;
    postContainers.forEach(function(container) {
      if (container.id === postId) {
        showPostContent(container);
        targetContainer = container;
        welcome.style.display = 'none';
        if (subpostId) {
          const subpost = container.querySelector(`.subpost#${subpostId}`);
          if (subpost) {
            scrollToElement(subpost, true);
          }
        } else {
          scrollToElement(container, false);
        }
      } else {
        container.style.display = 'none';
      }
    });
  }
  function showAllPosts() {
    postContainers.forEach(function(container, index) {
      container.style.display = 'block';
      if (index !== 0) {
        container.querySelector('.post-content').style.display = 'none';
      }
      observer.observe(container);
      const postNavBottom = container.querySelector('.post-nav-bottom');
      if (postNavBottom) {
        postNavBottom.remove();
      }
    });
    welcome.style.display = 'block';
    header.classList.remove('scrolled-down');
    topFunction()
    }
  function navigate(path) {
    const [postId, subpostId] = path.split('/');
    if (postId) {
      showSinglePost(postId, subpostId);
      history.pushState({ postId: postId, subpostId: subpostId }, '', `/${path}`);
    } else {
      showAllPosts();
      history.pushState({}, '', window.location.origin);
    }
  }
  window.onpopstate = function(event) {
    if (event.state && event.state.postId) {
      showSinglePost(event.state.postId, event.state.subpostId);
    } else {
      showAllPosts();
    }
  };
  document.addEventListener('click', function(event) {
    const anchor = event.target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noreferrer');
        return;
      }
      event.preventDefault();
      navigate(href.substring(1));
    }
  });
  const path = window.location.pathname.substring(1);
  if (path) {
    const [postId, subpostId] = path.split('/');
    showSinglePost(postId, subpostId);
  } else {
    showAllPosts();
  }
