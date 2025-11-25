// Single Page Application
const header = document.querySelector('header');
const headerHeight = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
const toTop = document.getElementById("toTop");
function goToTop() {window.scrollTo(0, 0);}
let lastUpdatedPath = '';
function scrollSPA(arg, isInitial = false) {
  if (arg && arg.nodeType && !(arg instanceof Event)) {
    const behavior = isInitial ? 'instant' : 'smooth';
    arg.closest('article').scrollIntoView({ behavior });
    const offsetTop = arg.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: offsetTop, behavior });
    return;
  }
  const event = arg;
  if (window.scrollY > headerHeight * 0.6) {
    header.classList.add('scrolled-down');
  } else {
    header.classList.remove('scrolled-down');
  }
  if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
    toTop.style.display = "inline-block";
  } else {
    toTop.style.display = "none";
  }
  const articles = document.querySelectorAll('article');
  let currentArticle, currentSection;
  let found = false;
  articles.forEach(article => {
    if (found) return;
    const rect = article.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      currentArticle = article;
      const sections = article.querySelectorAll('.section-title');
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top <= window.innerHeight / 2) {
          currentSection = section;
          break;
        }
      }
      found = true;
    }
  });
  if (currentArticle) {
    let path = currentArticle.id;
    if (currentSection) {
      path += `/${currentSection?.id}`;
    }
    if (path !== lastUpdatedPath) {
      history.replaceState(null, '', `/${path}`);
      lastUpdatedPath = path;
    }
  }
}
['scroll', 'touchmove', 'resize'].forEach(event => window.addEventListener(event, throttle(() => {
  scrollSPA(event);
}, 150)));
const articleObserver = new IntersectionObserver((articles) => {
  articles.forEach((article) => {
    if (article.isIntersecting) {
      article.target.querySelector('.article-content').style.display = 'block';
      articleObserver.unobserve(article.target);
    }
  });
});
const articles = document.querySelectorAll('article');
articles.forEach((article) => {
  article.querySelector('.article-content').style.display = 'none';
  articleObserver.observe(article);
});
function showBottomNav(container) {
  let navBottom = container.querySelector('.article-nav-bottom');
  if (!navBottom) {
    const topNav = container.querySelector('.article-nav');
    if (topNav) {
      navBottom = topNav.cloneNode(true);
      navBottom.classList.add('article-nav-bottom');
      container.appendChild(navBottom);
    }
  }
}
const welcome = document.getElementById('welcome');
function showAllArticles() {
  articles.forEach((article, index) => {
    article.style.display = 'block';
    if (index !== 0) {
      article.querySelector('.article-content').style.display = 'none';
      articleObserver.observe(article);
    }
    const navBottom = article.querySelector('.article-nav-bottom');
    if (navBottom) navBottom.remove();
  });
  welcome.style.display = 'block';
  goToTop();
}
function showArticle(articleId, sectionId, isInitial = false) {
  articles.forEach((container) => {
    const isTarget = container.id === articleId;
    container.style.display = isTarget ? 'block' : 'none';
    if (isTarget) {
      welcome.style.display = 'none';
      const content = container.querySelector('.article-content');
      if (content) content.style.display = 'block';
      showBottomNav(container);
      scrollSPA(isTarget ? (sectionId ? container.querySelector(`.section-title#${sectionId}`) : container) : null, isInitial);
      const newPath = `/${articleId}${sectionId ? `/${sectionId}` : ''}`;
      history.replaceState({ articleId, sectionId }, '', newPath);
    }
  });
}
const initialPath = window.location.pathname.substring(1);
const initialHash = window.location.hash.substring(1);
if (initialPath) {
  const [articleId, sectionId] = initialPath.split('/');
  if (articleId && document.getElementById(articleId)) {
    showArticle(articleId, sectionId, true);
  } else {
    showAllArticles();
  }
} else if (initialHash) {
  handleHash(initialHash);
} else {
  showAllArticles();
}
scrollSPA();
window.onpopstate = (event) => {
  if (event.state?.articleId) {
    showArticle(event.state.articleId, event.state.sectionId, false);
  } else {
    showAllArticles();
  }
};
function handleHash(hash) {
  if (hash === 'now-playing' || !document.getElementById(hash)) {
    showAllArticles();
    history.replaceState({}, '', window.location.origin);
  } else {
    const [articleId, sectionId] = hash.split('/');
    showArticle(articleId, sectionId, false);
  }
}
window.addEventListener('hashchange', () => handleHash(window.location.hash.substring(1)));
function navigateSPA(pathOrEvent, path) {
  const event = (pathOrEvent instanceof Event) ? pathOrEvent : undefined;
  const actualPath = event ? path : pathOrEvent;
  if (event) event.preventDefault();
  if (actualPath.startsWith('#')) {
    handleHash(actualPath.substring(1));
    return;
  }
  const [articleId, sectionId] = actualPath.split('/');
  if (articleId) {
    showArticle(articleId, sectionId, false);
  } else {
    showAllArticles();
    history.replaceState({}, '', window.location.origin);
  }
}
