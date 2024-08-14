// Single Page Application
let isInitialLoad = true;
let lastUpdatedPath = '';
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
        offsetTop = sectionCenterOffset - window.innerHeight * 0.15;
        window.scrollBy({top: offsetTop - window.scrollY});
        isInitialLoad = false;
      }, 200);
    }, 200);
  } else if (isInitialLoad) {
    let offsetTop = element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.1;
    window.scrollTo({
      top: offsetTop,
    });
    isInitialLoad = false;
  } else {
    let offsetTop = element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2;
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
  header.classList.remove('scrolled-down');
  topFunction();
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
function updateURLOnScroll() {
  const articles = document.querySelectorAll('article');
  let currentArticle, currentSection;
  articles.forEach(article => {
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
    }
  });
  if (currentArticle) {
    let path = currentArticle.id;
    if (currentSection) {
      path += `/${currentSection.id}`;
    }
    if (path !== lastUpdatedPath) {
      history.replaceState(null, '', `/${path}`);
      lastUpdatedPath = path;
    }
  }
}
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  }
}
window.addEventListener('scroll', throttle(updateURLOnScroll, 100));
const path = window.location.pathname.substring(1);
const hash = window.location.hash.substring(1);
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
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  handleHashNavigation(hash);
});
