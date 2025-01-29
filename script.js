// Завантаження JSON-даних
async function loadMovies() {
  try {
    const response = await fetch("movies.json");
    if (!response.ok) {
      throw new Error(`HTTP помилка! Статус: ${response.status}`);
    }
    const movies = await response.json();
    initializeTabs(movies);
  } catch (error) {
    console.error("Помилка при завантаженні фільмів:", error);
  }
}

// Ініціалізація вкладок
function initializeTabs(movies) {
  const buttons = document.querySelectorAll(".tab-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const tab = button.dataset.tab;
      displayTabContent(movies, tab);
    });
  });

  displayTabContent(movies, "general");
}

// Відображення вмісту залежно від обраної вкладки
function displayTabContent(movies, tab) {
  const content = document.getElementById("content");
  content.innerHTML = '<div class="genre-buttons"></div><ul id="movie-list"></ul>';
  
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";
  const genreButtons = document.querySelector(".genre-buttons");

  if (tab === "general") {
    displayMovies(movies);
  } else if (tab === "by-genres") {
    displayGenres(movies);
  } else if (tab === "movies") {
    displayMovieGenres(movies);
  } else if (tab === "cartoons") {
    displayCartoons(movies);
  }
}

// Відображення кнопок жанрів у вкладці Movies
function displayMovieGenres(movies) {
  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="genre-buttons">
      <button class="genre-button" data-genre="all-movies">Всі фільми</button>
      <button class="genre-button" data-genre="drama">Драма/Мелодрама</button>
      <button class="genre-button" data-genre="thriller">Трилер</button>
      <button class="genre-button" data-genre="fantasy">Фентезі</button>
      <button class="genre-button" data-genre="christian">Християнські</button>
      <button class="genre-button" data-genre="history">Історичні/Документальні</button>
      <button class="genre-button" data-genre="sci-fi">Наукова фантастика</button>
      <button class="genre-button" data-genre="action">Екшн</button>
      <button class="genre-button" data-genre="crime">Кримінальні/Детективи</button>
      <button class="genre-button" data-genre="comedy">Комедія</button>
      <button class="genre-button" data-genre="horror">Жахи</button>
    </div>
    <ul id="movie-list"></ul>
  `;

  const genreButtons = document.querySelectorAll(".genre-button");

  // Кнопка для перегляду всіх фільмів з жанром "movie"
  const allMoviesButton = document.querySelector("[data-genre='all-movies']");
  allMoviesButton.addEventListener("click", () => {
    const filteredMovies = movies.filter((movie) => movie.genre.toLowerCase().includes("movie"));
    displayMovies(filteredMovies);
  });

  // Додавання обробників для кожної кнопки жанру
  genreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const genre = button.dataset.genre;
      let filteredMovies;

      if (genre === "all-movies") {
        filteredMovies = movies.filter((movie) => movie.genre.toLowerCase().includes("movie"));
      } else {
        filteredMovies = movies.filter((movie) =>
          movie.genre.toLowerCase().includes("movie") && movie.genre.toLowerCase().includes(genre)
        );
      }

      displayMovies(filteredMovies);
    });
  });

  // Фільтруємо фільми за жанром "movie"
  const movieGenres = movies.filter((movie) => movie.genre.toLowerCase().includes("movie"));
  displayMovies(movieGenres);
}

// Відображення мультфільмів
function displayCartoons(movies) {
  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="genre-buttons">
      <button class="genre-button" data-genre="general">Всі</button>
      <button class="genre-button" data-genre="just-cartoons">Мультфільми</button>
      <button class="genre-button" data-genre="anime">Аніме</button>
    </div>
    <ul id="movie-list"></ul>
  `;

  document.querySelectorAll(".genre-button").forEach((button) => {
    button.addEventListener("click", () => {
      let genre = button.dataset.genre;
      let filteredMovies;
      if (genre === "general") {
        filteredMovies = movies.filter((movie) =>
          movie.genre.toLowerCase().includes("cartoon") ||
          movie.genre.toLowerCase().includes("anime")
        );
      } else if (genre === "just-cartoons") {
        filteredMovies = movies.filter((movie) =>
          movie.genre.toLowerCase().includes("cartoon") &&
          !movie.genre.toLowerCase().includes("anime")
        );
      } else {
        filteredMovies = movies.filter((movie) =>
          movie.genre.toLowerCase().includes("anime")
        );
      }
      displayMovies(filteredMovies);
    });
  });
}

// Відображення списку фільмів
function displayMovies(movieData) {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  movieData
    .sort((a, b) => b.rating - a.rating)
    .forEach((movie, index) => {
      const listItem = document.createElement("li");

      const title = document.createElement("span");
      title.className = "title";
      title.textContent = `${index + 1}. ${movie.title}`;

      const rating = document.createElement("span");
      rating.className = "rating";
      rating.textContent = `${movie.rating}`;

      listItem.appendChild(title);
      listItem.appendChild(rating);
      movieList.appendChild(listItem);
    });
}

// Відображення кнопок жанрів у вкладці By Genres
function displayGenres(movies) {
  const content = document.getElementById("content");
  content.innerHTML = '<div class="genre-buttons"></div><ul id="movie-list"></ul>';

  const genreButtons = document.querySelector(".genre-buttons");
  const excludedGenres = ["movie", "cartoon", "series", "anime"];
  const genres = [...new Set(
    movies
      .flatMap((movie) => movie.genre.split(",").map((g) => g.trim().toLowerCase()))
      .filter((genre) => !excludedGenres.includes(genre))
  )];

  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.className = "genre-button";
    
    const genreNames = {
      drama: "Драма/Мелодрама",
      thriller: "Трилер",
      fantasy: "Фентезі",
      christian: "Християнські",
      history: "Історичні/Документальні",
      "sci-fi": "Наукова фантастика",
      action: "Екшн",
      crime: "Кримінальні/Детективи",
      comedy: "Комедія",
      horror: "Жахи"
    };
    
    button.textContent = genreNames[genre] || genre.charAt(0).toUpperCase() + genre.slice(1);  // Якщо нема відповідного жанру, відображаємо оригінальний текст
    button.dataset.genre = genre;

    button.addEventListener("click", () => {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.toLowerCase().includes(genre)
      );
      displayMovies(filteredMovies);
    });

    genreButtons.appendChild(button);
  });
}


// Завантаження фільмів
loadMovies();
