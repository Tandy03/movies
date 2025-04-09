import { moviesList } from './movies.js';

const movieListElement = document.getElementById("movie-list");
const sortButton = document.getElementById("sort-button");
const tabButtons = document.querySelectorAll(".tab-button");

let currentTab = "general";
let isAscending = false;

const genreNames = {
    "drama": "Драма/Мелодрама",
    "thriller": "Трилер",
    "fantasy": "Фентезі",
    "christian": "Християнські",
    "history": "Історичні/Документальні",
    "sci-fi": "Наукова фантастика",
    "action": "Екшн",
    "crime": "Кримінальні/Детективи",
    "comedy": "Комедія",
    "horror": "Жахи"
};

function renderMovies(movies) {
    movieListElement.innerHTML = "";
    movies.forEach(movie => {
        const li = document.createElement("li");
        li.innerHTML = `<div class="list-item"><span>${movie.title}</span><span>⭐ ${movie.rating || "N/A"}</span></div>`;
        movieListElement.appendChild(li);
    });
}

function getFilteredMovies(tab) {
    switch (tab) {
        case "by-genres":
            return Object.keys(genreNames).map(genre => ({
                title: genreNames[genre],
                genre
            }));
        case "movies":
            return moviesList.filter(movie => movie.type === "movie");
        case "cartoons":
            return moviesList.filter(movie => movie.type === "cartoon" || movie.type === "anime");
        default:
            return moviesList;
    }
}

function handleTabChange(tab) {
    currentTab = tab;
    const filteredMovies = getFilteredMovies(tab);
    
    if (tab === "by-genres") {
        renderGenres(filteredMovies);
    } else {
        renderMovies(sortMovies(filteredMovies));
    }
}

function renderGenres(genres) {
    movieListElement.innerHTML = "";
    genres.forEach(({ title, genre }) => {
        const button = document.createElement("button");
        button.textContent = title;
        button.classList.add("genre-button");
        button.addEventListener("click", () => {
            const filteredMovies = moviesList.filter(movie => movie.genre.includes(genre));
            renderMovies(sortMovies(filteredMovies));
        });
        movieListElement.appendChild(button);
    });
}

function sortMovies(movies) {
    return [...movies].sort((a, b) => {
        if (!a.rating || !b.rating) return 0;
        return isAscending ? a.rating - b.rating : b.rating - a.rating;
    });
}

sortButton.addEventListener("click", () => {
    isAscending = !isAscending;
    handleTabChange(currentTab);
});

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        handleTabChange(button.dataset.tab);
    });
});

handleTabChange("general");
