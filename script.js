// Завантаження JSON-даних
async function loadMovies() {
    try {
      const response = await fetch('movies.json'); // Завантаження файлу
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
    const buttons = document.querySelectorAll('.tab-button');
    const movieList = document.getElementById('movie-list');
  
    // Додавання подій до кнопок
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const genre = button.dataset.genre;
        displayMovies(movies, genre);
      });
    });
  
    // Відображення всіх фільмів за замовчуванням
    displayMovies(movies, 'all');
  }
  
  // Відображення списку фільмів
  function displayMovies(movieData, genre) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
  
    // Фільтрація за жанром
    const filteredMovies = genre === 'all'
      ? movieData
      : movieData.filter(movie => {
          // Розділяємо жанри у фільмі на масив
          const genres = movie.genre.split(',').map(g => g.trim().toLowerCase());
          return genres.includes(genre.toLowerCase());
        });
  
    // Сортування за оцінкою
    filteredMovies.sort((a, b) => b.rating - a.rating);
  
    // Додавання фільмів до списку
    filteredMovies.forEach((movie, index) => {
      const listItem = document.createElement('li');
  
      const title = document.createElement('span');
      title.className = 'title';
      title.textContent = `${index + 1}. ${movie.title}`;
  
      const rating = document.createElement('span');
      rating.className = 'rating';
      rating.textContent = `${movie.rating}`;
  
      listItem.appendChild(title);
      listItem.appendChild(rating);
      movieList.appendChild(listItem);
    });
  }
  
  // Виклик функції для завантаження фільмів
  loadMovies();
  