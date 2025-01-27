// Завантаження JSON-даних
async function loadMovies() {
  try {
    const response = await fetch("movies.json"); // Завантаження файлу
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
  const content = document.getElementById("content");

  // Додавання подій до кнопок вкладок
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const tab = button.dataset.tab;
      displayTabContent(movies, tab);
    });
  });

  // Відображення вмісту першої вкладки за замовчуванням
  displayTabContent(movies, "general");
}

// Відображення вмісту залежно від обраної вкладки
function displayTabContent(movies, tab) {
  const content = document.getElementById("content");
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  if (tab === "general") {
    displayMovies(movies);
  } else if (tab === "by-genres") {
    displayGenres(movies);
  } else if (tab === "movies") {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.toLowerCase().includes("movie")
    );
    displayMovies(filteredMovies);
  } else if (tab === "cartoons") {
    content.innerHTML = `
      <div class="genre-buttons">
        <button class="genre-button" data-genre="cartoon">Cartoons</button>
        <button class="genre-button" data-genre="anime">Anime</button>
      </div>
      <ul id="movie-list"></ul>
    `;
    const genreButtons = document.querySelectorAll(".genre-button");
    genreButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const genre = button.dataset.genre;
        const filteredMovies = movies.filter((movie) =>
          movie.genre.toLowerCase().includes(genre)
        );
        displayMovies(filteredMovies);
      });
    });
  }
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

// Відображення кнопок жанрів
function displayGenres(movies) {
  const content = document.getElementById("content");
  content.innerHTML = '<div class="genre-buttons"></div><ul id="movie-list"></ul>';

  const genreButtons = document.querySelector(".genre-buttons");

  // Отримання унікальних жанрів
  const genres = [
    ...new Set(
      movies.flatMap((movie) =>
        movie.genre.split(",").map((g) => g.trim().toLowerCase())
      )
    ),
  ];

  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.className = "genre-button";
    button.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
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
