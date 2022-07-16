const apiKey = "api_key=1511d1bf441fc7968520e6e9b985b46c";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKey;
const imageUrl = "https://image.tmdb.org/t/p/w500";
let searchUrl = baseUrl + "/search/movie?" + apiKey + "&query=";

const form = document.getElementById("form");

const getData = (apiUrl) => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => showData(data.results));
};

const showData = (data) => {
  const mainBody = document.getElementById("main-content");
  mainBody.innerHTML = "";

  data.forEach((data) => {
    const movieElement = document.createElement("div");
    let overview = data.overview;
    overview = overview.slice(0,150);
    movieElement.classList.add(
      "movie",
      "block",
      "rounded-[1rem]",
      "shadow-lg",
      "w-[35%]",
      "max-w-[350px]",
      "m-[1rem]",
      "self-start",
      "relative"
    );

    if (data.poster_path == null) {
      movieElement.classList.remove("block");
      movieElement.innerHTML += `
          <div class="bg-white m-4">
            <p class="px-[1rem] py-[0.5rem] font-[700] text-center text-red-600">SORRY!! No Poster Available Now :(</p>
            <div class="flex font-bold justify-evenly text-[1.6em]">
              <p class="title">${data.title}</p>
              <p class="rating self-center bg-${renderRatingColor(data.vote_average)} px-[0.5rem] py-[0.3rem] rounded-md">${data.vote_average}</p>
            </div>
            <div class="overview text-[1.12rem]">
              <p class="overflow-hidden">
                ${overview} ...
              </p>
            </div>
        </div>`;
    } else {
      movieElement.innerHTML += `
          <img
            src="${imageUrl + data.poster_path}"
            alt="movie poster"
            class="movie-poster rounded-[1rem] drop-shadow-2xl h-auto"/>
          <div class="absolute rounded-[1rem] backdrop-blur-xl text-white translate-y-[-100%] hidden">
            <div class="movie-info font-bold text-xl m-4 flex justify-between text-[1.25rem]">
              <p class="title">${data.title}</p>
              <p class="rating self-center ${renderRatingColor(data.vote_average)} px-[0.5rem] py-[0.3rem] rounded-md">${data.vote_average}</p>
            </div>
            <div class="overview text-[1.12rem] m-4">
              <p>
              ${overview +'<b>...</b>'}
              </p>
            </div>
          </div>`;
    }

    mainBody.appendChild(movieElement);
  });
};

const searchMovie = (searchUrl) => {
  const query = document.getElementById("search-bar").value;
  fetch(searchUrl + query)
    .then((res) => res.json())
    .then((data) => {
      showData(data.results);
    });
};

const renderRatingColor = (rating) => {
  if(rating >= 7.5) {
    return 'bg-green-500';
  } else if(rating >= 4.5 && rating <= 7.4) {
    return 'bg-orange-500';
  } else {
    return 'bg-red-500';
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchMovie(searchUrl);
});

getData(apiUrl);
// searchMovie(searchUrl);