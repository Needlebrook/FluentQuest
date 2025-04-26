const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const HF_API_TOKEN = process.env.HF_API_TOKEN; // Set this in Replit secrets

app.post("/api/chat", async (req, res) => {
  const { message, language } = req.body;

  if (!message || !language) {
    return res.status(400).json({ error: "Missing message or language" });
  }

  console.log("Incoming message:", message);
  console.log("Language selected:", language);
  console.log("HF API token loaded:", HF_API_TOKEN ? "✅" : "❌");

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message, // No prompt engineering needed
          parameters: { max_new_tokens: 100 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error response:", errorText);
      return res.status(500).json({ error: "Hugging Face API returned an error" });
    }

    const result = await response.json();
    console.log("Hugging Face full response:", result);

    const replyText =
      result.generated_text ||
      (Array.isArray(result) && result[0]?.generated_text) ||
      "Sorry, I didn’t get that.";

    console.log("Reply to frontend:", replyText);

    res.json({ reply: replyText });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to get response from Hugging Face" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
