const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/fetch-story", async (req, res) => {
  const apiKey = 'ADD_Gemini_API_KEY'; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(apiKey); // Pass the API key directly

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Set the model
    // const prompt = 'Write a November 3rd, 2040 future news and only provide the conent. The news must highlights the environmental consequences of food waste. Write a compelling 7-sentence news addressing the severe impact of food waste on climate, land use, and resources, including realistic occasions in the United States of what have already happened with specific date in a specific location. Add humor and urgency to inspire readers.';
    const prompt = 'Write a news content written on November 3rd, 2040 which is the future. The news must highlights the environmental consequences of food waste. Write a compelling 7-sentence news addressing the severe impact of food waste on climate, land use, and resources, including realistic occasions on what could have already happened with specific date in a specific location in the United States. Add humor and urgency to inspire readers.';

    const result = await model.generateContent(prompt); // Call generateContent with the prompt
    res.json({ story: result.response.text() }); // Send the generated story back to the client
  } catch (error) {
    console.error("Error fetching story:", error.message); // Log specific error message
    res.status(500).json({ story: "An error occurred: " + error.message }); // Return detailed error message
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
