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
