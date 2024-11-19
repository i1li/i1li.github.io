function search() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const articles = document.querySelectorAll('article');
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';

  if (searchQuery.length === 0) {
    searchResultsContainer.innerHTML = '<p>Enter a search term</p>';
    searchResultsContainer.style.display = 'block';
    return;
  } else if (searchQuery.length < 3) {
    searchResultsContainer.style.display = 'none';
    return;
  }
searchResultsContainer.style.display = 'block';
  let hasResults = false;
  articles.forEach(function(article) {
    const articleContent = article.textContent.toLowerCase();
    const articleId = article.id || '';
    const titleElement = article.querySelector('h1, h2, h3'); 
    const articleTitle = titleElement ? titleElement.textContent : 'Untitled Article';
    if (articleContent.includes(searchQuery)) {
      hasResults = true;
      const queryIndex = articleContent.indexOf(searchQuery);
      const excerptStart = Math.max(0, queryIndex - 50);
      const excerptEnd = Math.min(articleContent.length, queryIndex + searchQuery.length + 50);
      let excerpt = articleContent.substring(excerptStart, excerptEnd);
      const highlightedExcerpt = excerpt.replace(
        new RegExp(searchQuery, 'gi'),
        match => `<strong>${match}</strong>`
      );
      const resultElement = document.createElement('div');
      resultElement.classList.add('search-result');
      const articleUrl = `${articleId}`;
      resultElement.innerHTML = `
        <h3>${articleId ? `<a href="/${articleUrl}" class="search-result-link">` : ''}${articleTitle}${articleId ? '</a>' : ''}</h3>
        <p>...${highlightedExcerpt}...</p>
      `;
      searchResultsContainer.appendChild(resultElement);
    }
  });
const searchResultLinks = searchResultsContainer.querySelectorAll('.search-result-link');
searchResultLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    closeSearchOverlay();
  });
});
  if (!hasResults) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No results found.';
    searchResultsContainer.appendChild(noResultsMessage);
  }
}
function openSearchOverlay() {
  document.getElementById("searchOverlay").style.display = "block";
  document.getElementById("searchInput").focus();
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleKeyPress);
  search();
}
function closeSearchOverlay() {
  document.getElementById("searchOverlay").style.display = "none";
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', handleKeyPress);
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}
function handleKeyPress(e) {
  if (e.key === "Escape") {
    closeSearchOverlay();
  }
}
document.getElementById('search').addEventListener('click', function(e) {
  e.preventDefault();
  openSearchOverlay();
});
document.getElementById('searchInput').addEventListener('input', throttle(function() {
  search();
}, 500));
