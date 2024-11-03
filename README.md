# Back To The Fridge
## Inspiration
Food waste is a serious environmental issue, causing significant harm to both the environment and agriculture. Ultimately, it comes back to affect us through the food we consume. "Back To The Fridge" was inspired by a playful parody of "Back To The Future" to spark interest while also raising awareness about the critical issue of future food waste. This project focuses on practical, immediate actions we can take today to make a difference. By helping users find recipes for soon-to-expire items in their fridge, the site turns potential waste into delicious meals, reducing food waste and promoting healthier eating. This motivation drove us to create a website that not only tackles food waste but also helps users stay healthy.


## What it does
The **"Back to the Fridge"** website guides users through three interactive stages:

**1. The Warning**: With _"The FoodTure Times,"_ the site calculates your cumulative food waste and estimates its environmental impact. Using the "Time Machine" button, you can even receive a future newspaper highlighting the effects of food waste, offering a fun yet eye-opening way to raise awareness about this pressing issue.

**2. The Mission**: Before food waste happens, the site helps you identify items in your fridge that are close to expiring. It includes a search engine that suggests recipes based on those ingredients, allowing you to turn potential waste into delicious meals and helping reduce food waste in a tasty and practical way.

**3. The Boost**: The platform goes further by analyzing the nutritional content of the ingredients you choose, promoting healthier eating. Enter your ingredients to get detailed nutritional information, ensuring your meals not only cut down on waste but also improve your health.

# 2024 TigerHacks Project

This guide will walk you through the steps to run the full functionality of the webpage for the 2024 TigerHacks project.

## Getting Started

1. **Clone the repository**:
   - Run the following command to clone the repository:
     ```bash
     git clone https://github.com/ahleexxxx/2024-TigerHacks.git
     ```
   - Alternatively, you can download the ZIP file and extract it on your local machine.

2. **Gemini API Key**:
   - Obtain a Gemini API key from the [Gemini website](https://www.gemini.com/).
   - Once you have the key, open the file `step1/step1_server.js` and replace the following line:
     ```javascript
     const apiKey = 'ADD_Gemini_API_KEY'; // Replace with your actual API key
     ```
   - Replace `'ADD_Gemini_API_KEY'` with your actual Gemini API key.

3. **Install Node.js**:
   - Ensure that [Node.js](https://nodejs.org/) is installed on your local computer. You can check if it's installed by running:
     ```bash
     node -v
     ```
   - If Node.js is not installed, download and install it from [here](https://nodejs.org/).

4. **Install Dependencies**:
   - Navigate to the project directory in your terminal and run the following command to install all the necessary dependencies:
     ```bash
     npm install
     ```

5. **Start the Server**:
   - After installing the dependencies, start the server by running:
     ```bash
     npm start
     ```

6. **Access the Webpage**:
   - Once the server is running, you will be able to access the webpage through the `index.html` file in the browser.

## Notes
- Make sure to update the API key before running the project.
- Ensure that all necessary dependencies are installed using `npm install`.

## Credits

This project utilizes resources from the following providers:

- **[Edamam API](https://www.edamam.com/)**: Used for accessing nutrition and recipe information. 
- **[Gemini API](https://www.gemini.com/)**: Used for cryptocurrency-related functionality.
- **[Canva](https://www.canva.com/)**: Used for creating images and designs used in this project.
- **[Lottie Files](https://lottiefiles.com/)**: Used for animations in the project.
- **[Back to the Future Logo Generator]**: Used for generating the project logo with the Back to the Future font.






