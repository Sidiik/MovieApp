const url =
  "https://api.themoviedb.org/3/search/movie?api_key=0d590da596214932844a02e304acd0ca";
const inputValue = document.querySelector(".inputValue");
const searcBtn = document.querySelector(".searchBtn");
const movieSearch = document.querySelector(".movie-searchable");
const imgUrl = "https://image.tmdb.org/t/p/w500";

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img src= ${imgUrl + movie.poster_path} data-movie-id=${
        movie.id
      }>`;
    }
  });
}

function createImageElement(movies) {
  const movieElem = document.createElement("div");
  movieElem.setAttribute("class", "movie");
  const movieTemp = `<section class="section">
    ${movieSection(movies)}
    </section>`;
  movieElem.innerHTML = movieTemp;
  return movieElem;
}

searcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const value = inputValue.value;
  const newUrl = url + "&query=" + value;
  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      movieSearch.innerHTML = "";
      const movies = data.results;
      const movieBlock = createImageElement(movies);
      movieSearch.appendChild(movieBlock);
      console.log("data", data);
    })
    .catch((err) => console.log(err));
});
