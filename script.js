const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const HF_API_KEY = process.env.HF_API_KEY; // Set this in Replit secrets

app.post("/api/chat", async (req, res) => {
  const { message, language } = req.body;
  if (!message || !language) {
    return res.status(400).json({ error: "Missing message or language" });
  }

  const systemPrompt = `You are a friendly and helpful language tutor. You will reply to the user in ${language}. After 3 exchanges, begin to provide short explanations or corrections in English to help learning.`;

  try {
    const hfResponse = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: {
          past_user_inputs: [systemPrompt],
          text: message
        }
      })
    });

    const result = await hfResponse.json();

    if (result.error) {
      console.error("Hugging Face error:", result);
      return res.status(500).json({ error: result.error });
    }

    const reply = result.generated_text || "Sorry, I didn’t understand that.";

    res.json({ reply });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to get response from Hugging Face" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
