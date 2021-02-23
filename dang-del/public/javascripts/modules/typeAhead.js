import axios from 'axios';

function searchResultsHTML(stores) {
  return stores
    .map(
      (store) =>
        `<a href="/store/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>`
    )
    .join('');
}

function typeAhead(search) {
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function () {
    // if there no value quit
    if (!this.value) {
      searchResults.style.display = 'none';
      return;
    }
    // show the search result
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';
    axios
      .get(`/api/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          const html = searchResultsHTML(res.data);
          searchResults.innerHTML = html;
        }
      })
      .catch((err) => console.error(err));
  });

  // handle keyboard inputs
  searchInput.on('keyup', (e) => console.log(e.keyCode));
}

export default typeAhead;
