document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("foodWasteForm");
    const receiptTableBody = document.getElementById("receiptTableBody");
    const totalWasteEl = document.getElementById("totalWaste");
    const totalCostEl = document.getElementById("totalCost");
    const generateButton = document.getElementById("generateButton");
    const newsContainer = document.getElementById("newsContainer");
    const calculateImpactButton = document.getElementById("calculateImpactButton");
    const impactResults = document.getElementById("impactResults");
    const ghgEmissionEl = document.getElementById("ghgEmission");
    const waterUsageEl = document.getElementById("waterUsage");
    const landUseEl = document.getElementById("landUse");
    const energyConsumptionEl = document.getElementById("energyConsumption");

    let totalWaste = 0;
    let totalCost = 0;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const foodItem = document.getElementById("foodItem").value.toLowerCase();
        const quantity = parseFloat(document.getElementById("quantity").value);
        const cost = parseFloat(document.getElementById("cost").value);

        totalWaste += quantity;
        totalCost += cost;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${foodItem}</td>
            <td>${quantity.toFixed(1)} kg</td>
            <td>$${cost.toFixed(2)}</td>
        `;
        receiptTableBody.appendChild(row);

        totalWasteEl.textContent = `${totalWaste.toFixed(1)} kg`;
        totalCostEl.textContent = `$${totalCost.toFixed(2)}`;

        form.reset();
    });

    // Set average GHG emission factor
    const averageEmissionFactor = 2.1; // kg CO₂e per kg of food

    // Update event listener for environmental impact calculation
    calculateImpactButton.addEventListener("click", function () {
        if (totalWaste > 0) {
            // Using the average emission factor for GHG emission
            const ghgEmission = totalWaste * averageEmissionFactor;

            // Use average multipliers for other impacts if no specific values are required
            const waterUsage = totalWaste * 1500;
            const landUse = totalWaste * 1.2;
            const energyConsumption = totalWaste * 1.25;

            // Display the results
            ghgEmissionEl.textContent = `${ghgEmission.toFixed(2)} kg CO₂`;
            waterUsageEl.textContent = `${waterUsage.toFixed(2)} L`;
            landUseEl.textContent = `${landUse.toFixed(2)} m²`;
            energyConsumptionEl.textContent = `${energyConsumption.toFixed(2)} kWh`;

            impactResults.style.display = "block";
        } else {
        alert("Please add some food items to calculate the environmental impact.");
        }
    });


    async function fetchStory() {
        try {
            const response = await fetch("http://localhost:3000/fetch-story");
            const data = await response.json();
            return data.story;
        } catch (error) {
            console.error("Error fetching story:", error);
            return "A Gemini API key is required for the backend, but it has been omitted for security purposes. We will demonstrate this functionality in our demo.";
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
