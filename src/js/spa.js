// Single Page Application
let isInitialLoad = true;
let lastUpdatedPath = '';
const path = window.location.pathname.substring(1);
const hash = window.location.hash.substring(1);
const articles = document.querySelectorAll('article');
const welcome = document.getElementById('welcome');
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
          navigateToElement(section, true);
        }
      } else {
        navigateToElement(container, false);
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
  goToTop();
}
function navigateToElement(element, isSection = false) {
  if (isSection && isInitialLoad) {
    const article = element.closest('article');
    article.scrollIntoView({
      block: 'center'
    });
    setTimeout(() => {
      let offsetTop = element.getBoundingClientRect().top + window.scrollY;
      setTimeout(() => {
        const sectionCenterOffset = (element.getBoundingClientRect().top + element.getBoundingClientRect().bottom) / 2 + window.scrollY;
        offsetTop = sectionCenterOffset - window.innerHeight * 0.2;
        window.scrollBy({top: offsetTop - window.scrollY});
        isInitialLoad = false;
      }, 200);
    }, 200);
  } else if (isInitialLoad) {
    let offsetTop = element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2;
    window.scrollTo({
      top: offsetTop,
    });
    isInitialLoad = false;
  } else {
    let offsetTop = element.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.1;
    window.scrollTo({
      top: offsetTop,
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
