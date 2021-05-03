const inputVal = document.querySelector(".inputValue");
const searchBtn = document.querySelector(".searchBtn");
const moviesSearch = document.querySelector(".movie-searchable");
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=0d590da596214932844a02e304acd0ca";
const imgUrl = "https://image.tmdb.org/t/p/w500";

function imgSetting(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return ` 
      <img src=${imgUrl + movie.poster_path} data-movie-id=${movie.id} > `;
    }
  });
}

function createContainer(movies) {
  let imgElem = document.createElement("div");
  imgElem.setAttribute("class", "movie");
  let imgElemTemp = `<section class="section">
  ${imgSetting(movies)}
  </section>`;
  imgElem.innerHTML = imgElemTemp;
  return imgElem;
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const value = inputVal.value;
  const newUrl = url + "&query=" + value;
  searchBtn.classList.add("dis");
  searchBtn.innerHTML = "searching...";
  moviesSearch.innerHTML = "";
  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const movies = data.results;
      const movieBlock = createContainer(movies);
      moviesSearch.appendChild(movieBlock);
      inputVal.value = "";
      inputVal.focus();

      searchBtn.classList.remove("dis");
      searchBtn.innerHTML = "Search now";
    })
    .catch((err) => {
      searchBtn.classList.remove("dis");
      searchBtn.innerHTML = "Search now";
    });
});
