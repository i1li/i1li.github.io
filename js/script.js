// Sticky Header & Go to top
const scrollTransition = 50;
const header = document.querySelector('header');
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
  document.querySelectorAll('a, .article-content, .article-content-wrapper, #bg-wrapper, #draw').forEach((element) => {
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
  adjustZoom(true);
});
document.getElementById("zoom-out").addEventListener("click", function() {
  adjustZoom(false);
});

// Single Page Application
let isInitialLoad = true;
function scrollToElement(element, isSection = false) {
  if (isSection && isInitialLoad) {
    const article = element.closest('article');
    article.scrollIntoView({
      block: 'center'
    });
    setTimeout(() => {
      let offsetTop = element.getBoundingClientRect().top + window.scrollY;
      setTimeout(() => {
        const sectionCenterOffset = (element.getBoundingClientRect().top + element.getBoundingClientRect().bottom) / 2 + window.scrollY;
        offsetTop = sectionCenterOffset - window.innerHeight * 0.1;         
        window.scrollBy({
          top: offsetTop - window.scrollY,
        });
        isInitialLoad = false;
      }, 200);
    }, 200);
  } else if (isInitialLoad){
    let offsetTop = element.getBoundingClientRect().top + window.scrollY + 25;
    window.scrollTo({
      top: offsetTop,
    });
    isInitialLoad = false;
  } else {
    let offsetTop = element.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo({
      top: offsetTop,
    });
  }
}
const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.querySelector('.article-content').style.display = 'block';
      observer.unobserve(entry.target);
    }
  });
});
const articles = document.querySelectorAll('article');
articles.forEach(function(container) {
  observer.observe(container);
  container.querySelector('.article-content').style.display = 'none';
});
const welcome = document.getElementById('welcome');
function showSingleArticle(articleId, sectionId) {
  articles.forEach(function(container) {
    if (container.id === articleId) {
      welcome.style.display = 'none';
      container.style.display = 'block';
      const articleContent = container.querySelector('.article-content');
      if (articleContent) {
        articleContent.style.display = 'block';
      }
      const articleNav = container.querySelector('.article-nav');
      if (articleNav) {
        let articleNavBottom = container.querySelector('.article-nav-bottom');
        if (!articleNavBottom) {
          articleNavBottom = articleNav.cloneNode(true);
          articleNavBottom.classList.add('article-nav-bottom');
          container.appendChild(articleNavBottom);
        }
      }
      if (sectionId) {
        const section = container.querySelector(`.section-title#${sectionId}`);
        if (section) {
          scrollToElement(section, true);
        }
      } else {
        scrollToElement(container, false);
      }
    } else {
      container.style.display = 'none';
    }
  });
}
function showAllArticles() {
  articles.forEach(function(container, index) {
    container.style.display = 'block';
    if (index !== 0) {
      container.querySelector('.article-content').style.display = 'none';
    }
    observer.observe(container);
    const articleNavBottom = container.querySelector('.article-nav-bottom');
    if (articleNavBottom) {
      articleNavBottom.remove();
    }
  });
  welcome.style.display = 'block';
  header.classList.remove('scrolled-down');
  topFunction()
  }
function navigate(path) {
  const [articleId, sectionId] = path.split('/');
  if (articleId) {
    showSingleArticle(articleId, sectionId);
    history.pushState({ articleId: articleId, sectionId: sectionId }, '', `/${path}`);
  } else {
    showAllArticles();
    history.pushState({}, '', window.location.origin);
  }
}
window.onpopstate = function(event) {
  if (event.state && event.state.articleId) {
    showSingleArticle(event.state.articleId, event.state.sectionId);
  } else {
    showAllArticles();
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
  const [articleId, sectionId] = path.split('/');
  if (articleId && document.getElementById(articleId)) {
    showSingleArticle(articleId, sectionId);
  } else {
    showAllArticles();
  }
} else {
  showAllArticles();
}
