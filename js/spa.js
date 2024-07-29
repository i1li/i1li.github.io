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
