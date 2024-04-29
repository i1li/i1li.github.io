function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function shuffleAndLimit(videoIds, limit = 150) {
  shuffle(videoIds);
  return videoIds.slice(0, limit);
}
function processYTElement(ytElement) {
  const videoIds = ytElement.getAttribute('v').split(',');
  if (videoIds.length > 1) {
    const limitedIds = shuffleAndLimit(videoIds);
    ytElement.setAttribute('v', limitedIds.join(','));
  }
}
function processDiv(containerId) {
  const container = document.getElementById(containerId);
  const ytElements = container.querySelectorAll('y-t');
  ytElements.forEach(processYTElement);
}
function processStack() {
  const musicDiv = document.getElementById('musix');
  const ytElements = Array.from(musicDiv.querySelectorAll('y-t'));
  shuffle(ytElements);
  let currentIndex = 0;
  let pick = document.getElementById('stack');
  pick.innerHTML = '';
  const clonedYTElement = ytElements[currentIndex].cloneNode(false);
  processYTElement(clonedYTElement);
  pick.appendChild(clonedYTElement);
  let next = document.querySelector("#next");
  next.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % ytElements.length;
    pick.innerHTML = '';
    const clonedYTElement = ytElements[currentIndex].cloneNode(false);
    processYTElement(clonedYTElement);
    pick.appendChild(clonedYTElement);
  });
}
processDiv('combined-list');
processDiv('musix');
processDiv('extra');
processStack();
