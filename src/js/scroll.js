// Sticky Header, Go to top of page, & update URL on scroll
const toTop = document.getElementById("toTop");
const header = document.querySelector('header');
const headerHeight = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
function goToTop() {
  header.classList.remove('scrolled-down');
  window.scrollTo(0, 0);
}
function handleScroll() {
  if (window.scrollY > headerHeight * .6) {
    header.classList.add('scrolled-down');
  } else {
    header.classList.remove('scrolled-down');
  }
  if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
      toTop.style.opacity = "0.4";
      toTop.style.pointerEvents = "auto";
    } else {
      toTop.style.opacity = "0";
      toTop.style.pointerEvents = "none";
    }
  }
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
['scroll', 'touchmove', 'resize'].forEach(event => window.addEventListener(event, throttle(() => {
  updateURLOnScroll();
  handleScroll();
}, 100)));
