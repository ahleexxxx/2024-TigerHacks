document.getElementById('nutrition-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const foodItems = document.getElementById('food-item').value.split(','); // Split by comma
  const appId = 'ee9884e1';
  const appKey = '74265ca56cd2eb95dde39f70f40cb147';
  const foodTableBody = document.getElementById('food-table').querySelector('tbody');
  foodTableBody.innerHTML = ''; // Clear previous results

  const nutritionFacts = document.getElementById('nutrition-facts');
  nutritionFacts.innerHTML = ''; // Clear previous total results

  let totalNutrition = {
      calories: 0,
      FAT: 0,
      FASAT: 0,
      CHOLE: 0,
      NA: 0,
      CHOCDF: 0,
      FIBTG: 0,
      SUGAR: 0,
      PROCNT: 0,
      VITD: 0,
      CA: 0,
      FE: 0,
      K: 0
  };

  let completedRequests = 0;

  foodItems.forEach(foodItem => {
      const trimmedFoodItem = foodItem.trim();
      const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(trimmedFoodItem)}`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
              
              if (data.calories) {
                  addFoodItemToTable(trimmedFoodItem, data);

                  // Accumulate each nutrient to total
                  totalNutrition.calories += data.calories || 0;
                  totalNutrition.FAT += data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity : 0;
                  totalNutrition.FASAT += data.totalNutrients.FASAT ? data.totalNutrients.FASAT.quantity : 0;
                  totalNutrition.CHOLE += data.totalNutrients.CHOLE ? data.totalNutrients.CHOLE.quantity : 0;
                  totalNutrition.NA += data.totalNutrients.NA ? data.totalNutrients.NA.quantity : 0;
                  totalNutrition.CHOCDF += data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity : 0;
                  totalNutrition.FIBTG += data.totalNutrients.FIBTG ? data.totalNutrients.FIBTG.quantity : 0;
                  totalNutrition.SUGAR += data.totalNutrients.SUGAR ? data.totalNutrients.SUGAR.quantity : 0;
                  totalNutrition.PROCNT += data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity : 0;
                  totalNutrition.VITD += data.totalNutrients.VITD ? data.totalNutrients.VITD.quantity : 0;
                  totalNutrition.CA += data.totalNutrients.CA ? data.totalNutrients.CA.quantity : 0;
                  totalNutrition.FE += data.totalNutrients.FE ? data.totalNutrients.FE.quantity : 0;
                  totalNutrition.K += data.totalNutrients.K ? data.totalNutrients.K.quantity : 0;
              } else {
                  console.error(`No data found for ${trimmedFoodItem}`);
              }

              completedRequests++;

              // Display total results when all requests are completed
              if (completedRequests === foodItems.length) {
                  displayTotalNutritionFacts(totalNutrition);
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              completedRequests++;

              if (completedRequests === foodItems.length) {
                  displayTotalNutritionFacts(totalNutrition);
              }
          });
  });
});

function addFoodItemToTable(foodItem, data) {
  const foodTableBody = document.getElementById('food-table').querySelector('tbody');
  const row = document.createElement('tr');

  const quantity = foodItem.match(/^\d+(\.\d+)?/);
  const unit = foodItem.match(/\b(cup|ounce|g|oz|ml|tbsp|tsp)\b/i) || ["whole"];

  // Removing both quantity and unit from foodItem
  const foodName = foodItem.replace(/^\d+(\.\d+)?\s*/, '').replace(/\b(cup|ounce|g|oz|ml|tbsp|tsp|whole)\b/i, '').trim();

  row.innerHTML = `
      <td>${quantity ? quantity[0] : '-'}</td>
      <td>${unit ? unit[0] : '-'}</td>
      <td>${foodName}</td>
      <td>${data.calories} kcal</td>
      <td>${data.totalWeight.toFixed(1)} g</td>
  `;

  foodTableBody.appendChild(row);
}

function displayTotalNutritionFacts(totalNutrition) {
  const nutritionFacts = document.getElementById('nutrition-facts');

  function formatNumber(value) {
      return value % 1 === 0 ? value : value.toFixed(2);
  }

  nutritionFacts.innerHTML = `
  <h2 class="nutrition-title">
    NutriBoost
    <img src="assets/Check.png" alt="Health Icon" class="health-icon">
  </h2>
  <p><strong>Amount Per Serving</strong></p>
  <hr class="thin-line">
  
  <div class="nutrition-section">
      <p><strong>Calories</strong> ${formatNumber(totalNutrition.calories)}</p>
      <hr class="thin-line">
  </div>
  
  <div class="nutrition-section">
      <p><strong>Total Fat</strong> ${formatNumber(totalNutrition.FAT)} g</p>
      <p class="indented">Saturated Fat ${formatNumber(totalNutrition.FASAT)} g</p>
      <hr class="thin-line">
  </div>

  <div class="nutrition-section">
      <p><strong>Cholesterol</strong> ${formatNumber(totalNutrition.CHOLE)} mg</p>
      <hr class="thin-line">
  </div>
  
  <div class="nutrition-section">
      <p><strong>Sodium</strong> ${formatNumber(totalNutrition.NA)} mg</p>
      <hr class="thin-line">
  </div>

  <div class="nutrition-section">
      <p><strong>Total Carbohydrate</strong> ${formatNumber(totalNutrition.CHOCDF)} g</p>
      <p class="indented">Dietary Fiber ${formatNumber(totalNutrition.FIBTG)} g</p>
      <p class="indented">Total Sugars ${formatNumber(totalNutrition.SUGAR)} g</p>
      <hr class="thin-line">
  </div>

  <div class="nutrition-section">
      <p><strong>Protein</strong> ${formatNumber(totalNutrition.PROCNT)} g</p>
      <hr class="thick-line">
  </div>

  <div class="nutrition-section">
      <p>Vitamin D ${formatNumber(totalNutrition.VITD)} µg</p>
      <p>Calcium ${formatNumber(totalNutrition.CA)} mg</p>
      <p>Iron ${formatNumber(totalNutrition.FE)} mg</p>
      <p>Potassium ${formatNumber(totalNutrition.K)} mg</p>
  </div>
  `;
}
