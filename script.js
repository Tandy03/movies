import moviesList from "./movies.js";

document.addEventListener("DOMContentLoaded", () => {
    const movieListElement = document.getElementById("moviesList");
    const genreFilter = document.getElementById("genreFilter");
    const sortToggle = document.getElementById("sortToggle");
    const tabButtons = document.querySelectorAll(".tabs button");

    const genreTranslations = {
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
        "movie": "Фільми",
        "series": "Серіали",
        "cartoon": "Мультфільми",
        "anime": "Аніме"
    };

    let currentCategory = "all";
    let isAscending = false;

    function filterMovies() {
        let filteredMovies = moviesList.filter(movie =>
            currentCategory === "all" || movie.genre.includes(currentCategory)
        );

        const selectedGenreKey = genreFilter.value;
        if (selectedGenreKey !== "all") {
            filteredMovies = filteredMovies.filter(movie => {
                if (currentCategory === "cartoon" && selectedGenreKey === "cartoon") {
                    return movie.genre.includes("cartoon") && !movie.genre.includes("anime");
                }
                return movie.genre.includes(selectedGenreKey);
            });
        }

        return filteredMovies.sort((a, b) => {
            if (!isAscending) return b.rating - a.rating; // Від найвищого до найнижчого (з 0)
            if (a.rating === 0) return 1; // Ховаємо 0 при зворотному сортуванні
            if (b.rating === 0) return -1;
            return a.rating - b.rating;
        });
    }

    function renderMovies() {
        const movies = filterMovies();
        movieListElement.innerHTML = movies.length
            ? movies.map(movie => {
                const translatedGenres = movie.genre.map(g => genreTranslations[g] || g).join(", ");
                return `<li><strong>${movie.title}</strong> <br> Жанр: ${translatedGenres} <br> Рейтинг: ${movie.rating}</li>`;
            }).join("")
            : "<li>Немає фільмів</li>";
    }

    function updateGenreFilter() {
        let genres = new Set(moviesList.flatMap(movie => movie.genre));

        if (currentCategory === "movie") {
            genres = new Set([...genres].filter(genre => !["movie", "series", "cartoon", "anime"].includes(genre)));
        } else if (currentCategory === "cartoon") {
            genres = new Set([...genres].filter(genre => ["series", "cartoon", "anime"].includes(genre)));
        } else if (currentCategory === "series") {
            genres = new Set([...genres].filter(genre => !["movie", "series"].includes(genre)));
        }

        genreFilter.innerHTML = '<option value="all">Всі жанри</option>' +
            [...genres].map(genre => `<option value="${genre}">${genreTranslations[genre] || genre}</option>`).join("");
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            currentCategory = button.dataset.category;
            updateGenreFilter();
            renderMovies();
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
