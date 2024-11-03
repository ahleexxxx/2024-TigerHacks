const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = 'da6c15d5';
const APP_key = '71dcfd106098e9c6de20c26b2e3bed71';
 //console.log(container);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
  //console.log(searchQuery);
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=100`;
  searchResultDiv.innerHTML = "<p>Loading recipes...</p>"; // Display loading message
  try {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    const data = await response.json();
    if (data.hits.length === 0) {
      searchResultDiv.innerHTML = "<p>No recipes found. Try a different ingredient.</p>";
    } else {
      generateHTML(data.hits);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    searchResultDiv.innerHTML = "<p>There was an error fetching recipes. Please try again later.</p>";
  }
}

function generateHTML(results) {
  container.classList.remove("initial");

  const generatedHTML = results.reduce((html, result) => {
    const { label, image, url, calories, dietLabels, healthLabels } = result.recipe;

    return (
      html +
      `
        <div class="item">
          <img src="${image}" alt="${label}">
          <div class="flex-container">
            <h1 class="title">${label}</h1>
            <a class="view-btn" target="_blank" href="${url}">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${calories.toFixed(2)} kcal</p>
          <p class="item-data">Diet: ${
            dietLabels.length > 0 ? dietLabels.join(", ") : "Not specified"
          }</p>
          <p class="item-data">Health: ${
            healthLabels.length > 0 ? healthLabels.join(", ") : "No health labels"
          }</p>
        </div>
      `
    );
  }, "");

  searchResultDiv.innerHTML = generatedHTML;
}


