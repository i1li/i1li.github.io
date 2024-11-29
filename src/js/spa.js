// Single Page Application
let isInitialLoad = true;
let lastUpdatedPath = '';
let path = window.location.pathname.substring(1);
let hash = window.location.hash.substring(1);
const articles = document.querySelectorAll('article');
const welcome = document.getElementById('welcome');
const headerVerse = document.getElementById('header-verse');
const welcomeOverlay = document.getElementById('welcome-overlay');
const welcomeDuration = 5000;
const welcomeInitialOpacity = .95
function easeInExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
}
function animateOverlay(startTime) {
    const now = performance.now();
    const elapsedTime = now - startTime;
    const progress = Math.min(elapsedTime / welcomeDuration, 1);
    if (progress < 1) {
        const opacity = welcomeInitialOpacity - easeInExpo(progress);
        welcomeOverlay.style.opacity = opacity.toFixed(3);
        requestAnimationFrame(() => animateOverlay(startTime));
    } else {
        welcomeOverlay.style.display = 'none';
        welcomeOverlay.style.pointerEvents = 'none';
        isInitialLoad = false;
    }
}
document.addEventListener("DOMContentLoaded", function() {
  if (isInitialLoad) {
    displayRandomBibleVerse();
    welcomeOverlay.style.opacity = welcomeInitialOpacity;
    requestAnimationFrame((timestamp) => animateOverlay(timestamp));
  }
  if (isMobile) {
    headerVerse.style.display = 'none';
  }
});
const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.querySelector('.article-content').style.display = 'block';
      observer.unobserve(entry.target);
    }
  });
});
articles.forEach(function(container) {
  observer.observe(container);
  container.querySelector('.article-content').style.display = 'none';
});
if (path) {
  const [articleId, sectionId] = path.split('/');
  if (articleId && document.getElementById(articleId)) {
    showSingleArticle(articleId, sectionId);
  } else {
    showAllArticles();
  }
} else if (hash) {
  handleHashNavigation(hash);
} else {
  showAllArticles();
}
window.onpopstate = function(event) {
  if (event.state && event.state.articleId) {
    showSingleArticle(event.state.articleId, event.state.sectionId);
  } else {
    showAllArticles();
  }
};
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
          navigateToElement(section);
        }
      } else {
        navigateToElement(container);
      }
      let path = `/${articleId}`;
      if (sectionId) {
        path += `/${sectionId}`;
      }
      history.replaceState({ articleId: articleId, sectionId: sectionId }, '', path);
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
    if (articleNavBottom) {articleNavBottom.remove();}
  });
  welcome.style.display = 'block';
  goToTop();
}
function navigateToElement(element) {
  header.classList.add("scrolled-down");
  let article = element.closest("article");
  if (isInitialLoad) {
    setTimeout(() => {
      article.scrollIntoView({
        behavior: "instant",
      });
      let offsetTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "instant",
      });
    }, 500);
  } else {
    article.scrollIntoView({
      behavior: "smooth",
    });
    let offsetTop = element.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}
function navigate(path) {
  if (path.startsWith('#')) {
    handleHashNavigation(path.substring(1));
  } else {
    const [articleId, sectionId] = path.split('/');
    if (articleId) {
      showSingleArticle(articleId, sectionId);
    } else {
      showAllArticles();
      history.replaceState({}, '', window.location.origin);
    }
  }
}
function handleHashNavigation(hash) {
  if (hash === 'now-playing' || !document.getElementById(hash)) {
    showAllArticles();
    history.replaceState(null, '', window.location.pathname);
  } else {
    const [articleId, sectionId] = hash.split('/');
    showSingleArticle(articleId, sectionId);
  }
}
function handleLinks(event) {
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
}
document.addEventListener('click', handleLinks);
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  handleHashNavigation(hash);
});
