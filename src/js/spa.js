// Single Page Application
const header = document.querySelector('header');
const headerHeight = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
const toTop = document.getElementById("toTop");
function goToTop() {window.scrollTo(0, 0);}
let lastUpdatedPath = '';
let isInitial = true;
let historyStack = new Map();
let currentHistoryIndex = -1;
history.scrollRestoration = 'manual';
function scrollSPA(arg, instantScrollNoHeaderOffset = false) {
  if (arg && arg.nodeType && !(arg instanceof Event)) {
    const behavior = instantScrollNoHeaderOffset ? 'instant' : 'smooth';
    arg.closest('article').scrollIntoView({ behavior });
    const offset = instantScrollNoHeaderOffset ? 0 : headerHeight;
    const offsetTop = arg.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: offsetTop, behavior });
    return;
  }
  if (currentHistoryIndex >= 0) historyStack.get(currentHistoryIndex).scrollY = window.scrollY;
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
      const newSectionId = currentSection ? currentSection.id : undefined;
      historyStack.get(currentHistoryIndex).sectionId = newSectionId;
      historyStack.get(currentHistoryIndex).path = path;
      history.replaceState({historyIndex: currentHistoryIndex}, '', `/${path}`);
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
function showAllArticles(fromHistory = false) {
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
  if (!fromHistory) goToTop();
}
function showArticle(articleId, sectionId, isInitial = false, fromHistory = false) {
  articles.forEach(container => {
    if (container.id !== articleId) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'block';
    welcome.style.display = 'none';
    const contentEl = container.querySelector('.article-content');
    if (contentEl) contentEl.style.display = 'block';
    showBottomNav(container);
    if (fromHistory) {
      const sectionEl = sectionId ? container.querySelector(`.section-title#${sectionId}`) : container;
      const scrollTop = sectionEl.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({top: scrollTop, behavior: 'instant'});
    } else {
      scrollSPA(sectionId ? container.querySelector(`.section-title#${sectionId}`) : container, isInitial && !!sectionId);
    }
  });
}
const initialPath = window.location.pathname.substring(1);
const initialHash = window.location.hash.substring(1);
let initialArticleId = null;
let initialSectionId = null;
if (initialPath) {
  const [articleId, sectionId] = initialPath.split('/');
  if (articleId && document.getElementById(articleId)) {
    showArticle(articleId, sectionId, true);
    initialArticleId = articleId;
    initialSectionId = sectionId;
  } else {
    showAllArticles();
  }
} else if (initialHash) {
  handleHash(initialHash);
} else {
  showAllArticles();
}
currentHistoryIndex = 0;
historyStack.set(0, {path: initialPath, articleId: initialArticleId, sectionId: initialSectionId, scrollY: 0});
history.replaceState({historyIndex: 0}, '', window.location.pathname);
document.body.setAttribute(`data-history-${currentHistoryIndex}`, 'true');
scrollSPA();
window.onpopstate = (event) => {
  if (event.state && event.state.historyIndex !== undefined) {
    currentHistoryIndex = event.state.historyIndex;
    document.body.setAttribute(`data-history-${currentHistoryIndex}`, 'true');
    const entry = historyStack.get(currentHistoryIndex);
    if (entry.articleId) {
      showArticle(entry.articleId, entry.sectionId, false, true);
    } else {
      showAllArticles(true);
      window.scrollTo({top: entry.scrollY, behavior: 'instant'});
    }
  } else {
    showAllArticles();
  }
};
function handleHash(hash) {
  if (hash === 'now-playing' || !document.getElementById(hash.split('/')[0])) {
    navigateSPA('/');
  } else {
    navigateSPA(hash);
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
  const [newArticleId, newSectionId] = actualPath.split('/');
  const newPath = actualPath;
  if (newPath === historyStack.get(currentHistoryIndex)?.path) return;
  if (currentHistoryIndex >= 0) historyStack.get(currentHistoryIndex).scrollY = window.scrollY;
  currentHistoryIndex++;
  for (let key of Array.from(historyStack.keys()).sort((a,b)=>a-b)) {if (key > currentHistoryIndex) historyStack.delete(key);}
  historyStack.set(currentHistoryIndex, {path: newPath, articleId: newArticleId, sectionId: newSectionId, scrollY: 0});
  history.pushState({historyIndex: currentHistoryIndex}, '', newPath ? `/${newPath}` : '/');
  document.body.setAttribute(`data-history-${currentHistoryIndex}`, 'true');
  if (newArticleId) {
    showArticle(newArticleId, newSectionId, false, false);
  } else {
    showAllArticles();
  }
}
