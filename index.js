const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// File to store intents
defaultFilePath = path.join(__dirname, "intents.json");

// Utility function to save data to a file
function saveToFile(data, filePath) {
  try {
    const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// POST /api/intents endpoint
app.post("/api/intents", (req, res) => {
  const { intentName, trainingPhrases, response } = req.body;

  // Validation
  if (!intentName) {
    return res.status(400).json({
      success: false,
      message: "Validation failed: 'intentName' is required."
    });
  }

  if (!trainingPhrases || !Array.isArray(trainingPhrases) || trainingPhrases.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed: At least one 'trainingPhrase' is required."
    });
  }

  if (!response) {
    return res.status(400).json({
      success: false,
      message: "Validation failed: 'response' is required."
    });
  }

  // Intent data
  const intentData = {
    intentName,
    trainingPhrases,
    response
  };

  // Save to file
  const result = saveToFile(intentData, defaultFilePath);

  if (result.success) {
    return res.status(200).json({
      success: true,
      message: "Intent saved successfully!"
    });
  } else {
    return res.status(500).json({
      success: false,
      message: `Failed to save intent: ${result.error}`
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
