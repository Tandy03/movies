import moviesList from "./movies.js";

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("movie-list");
  const genreButtonsContainer = document.createElement("div");
  const tabs = document.querySelectorAll(".tab-button");
  const sortButton = document.getElementById("sort-button");
  const sortIcon = document.getElementById("sort-icon");

  const genres = {
    "drama": "Драма/Мелодрама",
    "thriller": "Трилер",
    "fantasy": "Фентезі",
    "christian": "Християнські",
    "history": "Історичні/Документальні",
    "sci-fi": "Наукова фантастика",
    "action": "Екшн",
    "crime": "Кримінальні/Детективи",
    "comedy": "Комедія",
    "horror": "Жахи",
  };

  let isAscending = false;

  function renderMovies(movies) {
    content.innerHTML = "";
    movies.forEach((movie, index) => {
      const li = document.createElement("li");
      li.id = "list";

      const titleDiv = document.createElement("div");
      titleDiv.textContent = `${index + 1}. ${movie.title}`;

      const ratingDiv = document.createElement("div");
      ratingDiv.textContent = movie.rating;

      li.appendChild(titleDiv);
      li.appendChild(ratingDiv);

      content.appendChild(li);
    });
  }

  function filterMoviesByGenre(genre) {
    return moviesList.filter((movie) => movie.genre.includes(genre));
  }

  function createGenreButtons(filterFunction) {
    genreButtonsContainer.innerHTML = "";
    Object.entries(genres).forEach(([key, value]) => {
      const button = document.createElement("button");
      button.textContent = value;
      button.addEventListener("click", () => {
        renderMovies(filterFunction(key));
      });
      genreButtonsContainer.appendChild(button);
    });
    content.appendChild(genreButtonsContainer);
  }

  function sortMovies(movies, ascending) {
    const filteredMovies = ascending
      ? movies
          .filter((movie) => movie.rating > 0)
          .sort((a, b) => a.rating - b.rating)
      : movies.sort((a, b) => b.rating - a.rating);
    renderMovies(filteredMovies);
  }

  sortButton.addEventListener("click", () => {
    isAscending = !isAscending;
    sortIcon.innerHTML = isAscending
      ? `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`
      : `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`;

    sortMovies([...moviesList], isAscending);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const tabName = tab.dataset.tab;

      content.innerHTML = "";
      if (tabName === "general") {
        sortMovies([...moviesList], isAscending);
        sortButton.id = "sort-button";
      } else if (tabName === "by-genres") {
        createGenreButtons(filterMoviesByGenre);
        sortButton.id = "sort-button-hidden";
      } else if (tabName === "movies") {
        content.innerHTML = `
                    <button id="all-movies">Всі фільми</button>
                    <button id="drama">Драма/Мелодрама</button>
                    <button id="thriller">Трилер</button>
                    <button id="fantasy">Фентезі</button>
                    <button id="christian">Християнські</button>
                    <button id="history">Історичні/Документальні</button>
                    <button id="sci-fi">Наукова фантастика</button>
                    <button id="action">Екшн</button>
                    <button id="crime">Кримінальні/Детективи</button>
                    <button id="comedy">Комедія</button>
                    <button id="horror">Жахи</button>
                `;
        document.getElementById("all-movies").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("movie").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("drama").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("drama").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("thriller").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("thriller").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("fantasy").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("fantasy").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("christian").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("christian").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("history").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("history").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("sci-fi").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("sci-fi").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("action").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("action").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("crime").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("crime").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("comedy").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("comedy").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        document.getElementById("horror").addEventListener("click", () => {
          renderMovies(
            filterMoviesByGenre("horror").filter((movie) =>
              movie.genre.includes("movie")
            )
          );
        });
        sortButton.id = "sort-button-hidden";
      } else if (tabName === "cartoons") {
        content.innerHTML = `
                    <button id="all-cartoons">Усі мультфільми</button>
                    <button id="only-cartoons">Тільки мультфільми</button>
                    <button id="anime">Аніме</button>
                `;
        document
          .getElementById("all-cartoons")
          .addEventListener("click", () => {
            renderMovies(filterMoviesByGenre("cartoon"));
          });
        document
          .getElementById("only-cartoons")
          .addEventListener("click", () => {
            renderMovies(
              filterMoviesByGenre("cartoon").filter(
                (movie) => !movie.genre.includes("anime")
              )
            );
          });
        document.getElementById("anime").addEventListener("click", () => {
          renderMovies(filterMoviesByGenre("anime"));
        });
        sortButton.id = "sort-button-hidden";
      }
    });
  });

  sortMovies([...moviesList], isAscending);
});
