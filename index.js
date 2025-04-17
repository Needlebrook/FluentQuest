const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const { message, language } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a friendly language tutor helping the user practice ${language}. Always reply in ${language} to teach the user basic phrases and progressively introduce more complex vocabulary and grammar. After each response, add short feedback and encouragement in English.`,
        },
        { role: "user", content: message },
      ],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Error processing your request.");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
