function shuffle(array, limit = Infinity) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, Math.min(limit, array.length - 1));
}
function processElement(element) {
  const array = element.getAttribute('v').split(',');
  if (array.length > 1) {
    const limitedArray = shuffle(array,150);
    element.setAttribute('v', limitedArray.join(','));
  }
}
function processDiv(containerId) {
  const container = document.getElementById(containerId);
  const elements = container.querySelectorAll('y-t');
  elements.forEach(processElement);
}
const musicDiv = document.getElementById('musix');
const extraDiv = document.getElementById('extra');
const elements = Array.from(musicDiv.querySelectorAll('y-t')).concat(Array.from(extraDiv.querySelectorAll('y-t')));
function shuffleAndDraw() {
  shuffle(elements);
  let currentIndex = 0;
  let draw = document.getElementById('draw');
  draw.innerHTML = '';
  const clonedElement = elements[currentIndex].cloneNode(false);
  processElement(clonedElement);
  draw.appendChild(clonedElement);
  let next = document.querySelector("#next");
  next.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % elements.length;
    draw.innerHTML = '';
    const clonedElement = elements[currentIndex].cloneNode(false);
    processElement(clonedElement);
    draw.appendChild(clonedElement);
  });
}
function limitAndCombine() {
  const combinedElements = elements.reduce((acc, element) => {
    const elements = element.getAttribute('v').split(',');
    return [...acc, ...shuffle(elements,4)];
  }, []);
  const combo = document.getElementById('combined-list');
  const comboElement = combo.querySelector('y-t');
  comboElement.setAttribute('v', [...new Set(combinedElements)].join(','));
}
processDiv('musix');
processDiv('extra');
shuffleAndDraw();
limitAndCombine();
processDiv('combined-list');
