const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const languageSelector = document.getElementById("language");
const courseContent = document.getElementById("course-content");

// Course material data
const courseData = {
  Hindi: "🪔 Hindi Basics: नमस्ते (Hello), धन्यवाद (Thank you), आप कैसे हैं? (How are you?)",
  Malayalam: "🌴 Malayalam Basics: നമസ്കാരം (Hello), നന്ദി (Thank you), സുഖമാണോ? (How are you?)",
  French: "🥖 French Basics: Bonjour (Hello), Merci (Thank you), Comment ça va? (How are you?)",
  German: "🕍 German Basics: Hallo (Hello), Danke (Thank you), Wie geht's? (How are you?)",
};

// Update course content display
function updateCourseContent() {
  const language = languageSelector.value;
  courseContent.innerText = courseData[language] || "No course material available.";
}

// Trigger course content update on load and language change
languageSelector.addEventListener("change", updateCourseContent);
updateCourseContent();

// Send message to HuggingFace model
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  const lang = languageSelector.value;

  // Show user's message
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  userInput.value = "";

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-3B", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_HF_API_TOKEN" // 🔁 Replace with your actual HuggingFace API token
      },
      body: JSON.stringify({ inputs: message })
    });

    const data = await response.json();

    const botReply =
      data.generated_text || (Array.isArray(data) && data[0]?.generated_text) || "🤖 Sorry, I didn't understand that.";

    // Show bot's response
    chatBox.innerHTML += `<div class="message bot"><strong>Bot (${lang}):</strong> ${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div class="message error">⚠️ Error: ${err.message}</div>`;
  }
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
