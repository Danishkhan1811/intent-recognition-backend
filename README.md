# Intent API Documentation

This API allows you to store intents with training phrases and responses into a file (`intents.json`). The intents are stored and validated via the `/api/intents` POST endpoint.

## Endpoints

### POST `/api/intents`
This endpoint is used to create a new intent. It accepts a JSON body with the following fields:

#### Request Body

```json
{
  "intentName": "string",        // The name of the intent (required)
  "trainingPhrases": [           // A list of training phrases for the intent (required, array of strings)
    "string"
  ],
  "response": "string"           // The response to be triggered for the intent (required)
}
```

## Installation

To set up the Image Compression API locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
   ```bash
   cd <project-directory>

3. Install the required dependencies:
   ```bash
   npm install

4. Start the server:
   ```bash
   node index.js
