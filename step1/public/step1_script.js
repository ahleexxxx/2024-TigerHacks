document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("foodWasteForm");
  const receiptList = document.getElementById("receiptList");
  const totalWasteEl = document.getElementById("totalWaste");
  const totalCostEl = document.getElementById("totalCost");
  const generateButton = document.getElementById("generateButton");
  const newsContainer = document.getElementById("newsContainer");

  let totalWaste = 0;
  let totalCost = 0;

  form.addEventListener("submit", function (event) {
      event.preventDefault();

      const foodItem = document.getElementById("foodItem").value;
      const quantity = parseFloat(document.getElementById("quantity").value);
      const cost = parseFloat(document.getElementById("cost").value);

      totalWaste += quantity;
      totalCost += cost;

      const listItem = document.createElement("li");
      listItem.textContent = `${foodItem} - ${quantity} kg - $${cost.toFixed(2)}`;
      receiptList.appendChild(listItem);

      totalWasteEl.textContent = `${totalWaste.toFixed(1)} kg`;
      totalCostEl.textContent = `$${totalCost.toFixed(2)}`;

      form.reset();
  });

  async function fetchStory() {
      try {
          const response = await fetch("http://localhost:3000/fetch-story");
          const data = await response.json();
          return data.story;
      } catch (error) {
          console.error("Error fetching story:", error);
          return "An error occurred. Please try again later.";
      }
  }

  generateButton.addEventListener("click", async () => {
    // Display loading message with inline styles
    newsContainer.innerHTML = '<p id="loadingMessage">Time Machine Loading...</p>';
    const loadingMessage = document.getElementById("loadingMessage");
    
    // Apply inline styles
    loadingMessage.style.color = "#ffffff";
    loadingMessage.style.fontWeight = "bold";
    loadingMessage.style.fontSize = "1.5rem";
    loadingMessage.style.textAlign = "center";
    loadingMessage.style.margin = "20px 0";
    
    newsContainer.style.display = "block";
    
    const story = await fetchStory();
    newsContainer.innerHTML = `
        <div class="newspaper">
            <h1 class="headline">The FoodTure Times</h1>
            <h2 class="date">November 3, 2040</h2>
            <div class="story">
                <p>${story}</p>
            </div>
        </div>
    `;
    newsContainer.style.display = "block";
});

});


