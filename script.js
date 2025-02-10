const GNEWS_API_KEY = "13f3ce21964b3e54137d5666e61e5299";
const UNSPLASH_ACCESS_KEY = "Nj6xVdzauELWLEeLMrzZ-gqPkLpD-iPlEP1AYZHWv1Q";

const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("news-query");
const searchBtn = document.getElementById("search-btn");
const filterButtons = document.querySelectorAll(".filter-btn");
const loadMoreBtn = document.getElementById("load-more");
const toggleThemeBtn = document.getElementById("toggle-theme");

let category = "general";
let page = 1;

// Fetch news from GNews API
async function fetchNews() {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=6&page=${page}&apikey=${GNEWS_API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Fetch images from Unsplash API
async function fetchNewsImage(query) {
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.urls?.regular || "default-image.jpg"; 
    } catch (error) {
        return "default-image.jpg";
    }
}

// Display news articles
async function displayNews(articles) {
    for (const article of articles) {
        const imageUrl = await fetchNewsImage(article.title);
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-header">
                <img src="${imageUrl}" alt="News Image">
            </div>
            <div class="card-content">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank" class="read-more">Read More</a>
            </div>
        `;
        newsContainer.appendChild(card);
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    category = searchInput.value || "general";
    page = 1;
    newsContainer.innerHTML = "";
    fetchNews();
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        category = btn.dataset.category;
        page = 1;
        newsContainer.innerHTML = "";
        fetchNews();
    });
});

loadMoreBtn.addEventListener("click", () => {
    page++;
    fetchNews();
});

toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Initial Fetch
fetchNews();
