const API_KEY = "13f3ce21964b3e54137d5666e61e5299"; // Your GNews API Key
const BASE_URL = "https://gnews.io/api/v4/top-headlines";
const newsContainer = document.getElementById("news-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const loadMoreButton = document.getElementById("load-more");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const categoryButtons = document.querySelectorAll(".category-btn");

let page = 1;
let category = "general"; // Default category
let searchQuery = "";

// Fetch and display news
async function fetchNews() {
    try {
        const url = `${BASE_URL}?category=${category}&lang=en&max=10&page=${page}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
            data.articles.forEach(article => {
                const newsCard = document.createElement("div");
                newsCard.classList.add("news-card");

                newsCard.innerHTML = `
                    <img src="${article.image}" alt="News Image">
                    <h3>${article.title}</h3>
                    <p>${article.description || "No description available."}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                `;

                newsContainer.appendChild(newsCard);
            });
        } else {
            console.error("No articles found");
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Search news
async function searchNews() {
    newsContainer.innerHTML = "";
    searchQuery = searchInput.value.trim();
    page = 1;
    try {
        const url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&max=10&page=${page}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        newsContainer.innerHTML = "";
        data.articles.forEach(article => {
            const newsCard = document.createElement("div");
            newsCard.classList.add("news-card");

            newsCard.innerHTML = `
                <img src="${article.image}" alt="News Image">
                <h3>${article.title}</h3>
                <p>${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank">Read More</a>
            `;

            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Category Buttons
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        category = button.getAttribute("data-category");
        page = 1;
        newsContainer.innerHTML = "";
        fetchNews();
    });
});

// Initial Fetch
fetchNews();
searchButton.addEventListener("click", searchNews);
loadMoreButton.addEventListener("click", () => { page++; fetchNews(); });
