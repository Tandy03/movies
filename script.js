import moviesList from "./movies.js";
import imdb from "./imdb.js";

document.addEventListener("DOMContentLoaded", () => {
  const movieListElement = document.getElementById("moviesList");
  const genreFilter = document.getElementById("genreFilter");
  const sortToggle = document.getElementById("sortToggle");
  const tabButtons = document.querySelectorAll(".tabs button");

  const genreTranslations = {
    drama: "Драма/Мелодрама",
    thriller: "Трилер",
    fantasy: "Фентезі",
    christian: "Християнські",
    history: "Історичні/Документальні",
    "sci-fi": "Наукова фантастика",
    action: "Екшн",
    crime: "Кримінальні/Детективи",
    comedy: "Комедія",
    horror: "Жахи",
    movie: "Фільми",
    series: "Серіали",
    cartoon: "Мультфільми",
    anime: "Аніме",
  };

  let currentCategory = "all";
  let isAscending = false;

  function filterMovies() {
    let filteredMovies = moviesList.filter(
      (movie) =>
        currentCategory === "all" || movie.genre.includes(currentCategory)
    );

    const selectedGenreKey = genreFilter.value;
    if (selectedGenreKey !== "all") {
      filteredMovies = filteredMovies.filter((movie) => {
        if (currentCategory === "cartoon" && selectedGenreKey === "cartoon") {
          return (
            movie.genre.includes("cartoon") && !movie.genre.includes("anime")
          );
        }
        return movie.genre.includes(selectedGenreKey);
      });
    }

    if (isAscending) {
      filteredMovies = filteredMovies.filter((movie) => movie.rating > 0);
    }

    return filteredMovies.sort((a, b) => {
      if (!isAscending) return b.rating - a.rating;
      return a.rating - b.rating;
    });
  }

  function renderMovies() {
    const movies = filterMovies();
    movieListElement.innerHTML = movies
          .map((movie, idx) => {
            const translatedGenres = movie.genre
              .map((g) => genreTranslations[g] || g)
              .join(", ");
            return `<li>
                          <span class="movie-title">${idx + 1}. ${
              movie.title
            }</span>
                          <span class="genres-label">${translatedGenres}</span>
                          <span class="rating">${movie.rating}</span>
                        </li>`;
          })
          .join("");
  }

  function renderImdbMovies() {
    movieListElement.innerHTML = imdb.length
        ? imdb
            .map((movie, idx) => {
              return `<li class = "imdb-li">
                   <span class="movie-title-imdb">${idx + 1}. ${movie.title} (${movie.year})</span>
                   <span class="imdb-rating">IMDB: ${movie.imdb}</span>
                   <span class="rating">Рейтинг: ${movie.rating}</span>
                   <span class="watched">${movie.watched ? '✔' : '✖'}</span>
                 </li>`;
            })
            .join("")
        : "<li>Немає фільмів у списку IMDB-250</li>";
  }

  function updateGenreFilter() {
    let genres = new Set(moviesList.flatMap((movie) => movie.genre));

    if (currentCategory === "all") {
      genres = new Set(
          [...genres].filter(
              (genre) => !["movie", "series", "cartoon", "anime"].includes(genre)
          )
      );
    } else if (currentCategory === "movie") {
      genres = new Set(
        [...genres].filter(
          (genre) => !["movie", "series", "cartoon", "anime"].includes(genre)
        )
      );
    } else if (currentCategory === "cartoon") {
      genres = new Set(
        [...genres].filter((genre) =>
          ["series", "cartoon", "anime"].includes(genre)
        )
      );
    } else if (currentCategory === "series") {
      genres = new Set(
        [...genres].filter((genre) => !["movie", "series"].includes(genre))
      );
    }

    genreFilter.innerHTML =
      '<option value="all">Всі жанри</option>' +
      [...genres]
        .map(
          (genre) =>
            `<option value="${genre}">${
              genreTranslations[genre] || genre
            }</option>`
        )
        .join("");
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filtersBlock = document.querySelector(".filters") || document.querySelector(".filters-hidden");

      currentCategory = button.dataset.category;

      if (currentCategory === "imdb") {
        if (filtersBlock && filtersBlock.classList.contains("filters")) {
          filtersBlock.classList.remove("filters");
          filtersBlock.classList.add("filters-hidden");
        }
        renderImdbMovies();
      } else {
        if (filtersBlock && filtersBlock.classList.contains("filters-hidden")) {
          filtersBlock.classList.remove("filters-hidden");
          filtersBlock.classList.add("filters");
        }
        updateGenreFilter();
        renderMovies();
      }
    });
  });

  genreFilter.addEventListener("change", renderMovies);

  sortToggle.addEventListener("click", () => {
    isAscending = !isAscending;
    sortToggle.textContent = isAscending ? "⬇️" : "⬆️";
    renderMovies();
  });

  updateGenreFilter();
  renderMovies();
});
