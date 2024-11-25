// Sticky Header & Go to top
const scrollTransition = 50;
const header = document.querySelector('header');
const toTop = document.getElementById("toTop");
function goToTop() {
  window.scrollTo(0, 0);
}
function handleScroll() {
  if (window.scrollY > scrollTransition) {
    header.classList.add('scrolled-down');
  } else {
    header.classList.remove('scrolled-down');
  }
  if (document.body.scrollTop > scrollTransition * 7 || document.documentElement.scrollTop > scrollTransition * 7) {
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
}, 500)));
