const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const languageSelector = document.getElementById("language");
const courseContent = document.getElementById("course-content");

const courseData = {
  Hindi: "🪔 Hindi Basics: नमस्ते (Hello), धन्यवाद (Thank you), आप कैसे हैं? (How are you?)",
  Malayalam: "🌴 Malayalam Basics: നമസ്കാരം (Hello), നന്ദി (Thank you), സുഖമാണോ? (How are you?)",
  French: "🥖 French Basics: Bonjour (Hello), Merci (Thank you), Comment ça va? (How are you?)",
  German: "🕍 German Basics: Hallo (Hello), Danke (Thank you), Wie geht's? (How are you?)",
};

function updateCourseContent() {
  const language = languageSelector.value;
  courseContent.innerText = courseData[language] || "No course material available.";
}

// Update course content on page load and when language changes
languageSelector.addEventListener("change", updateCourseContent);
updateCourseContent();

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  const language = languageSelector.value;

  // Show user's message in chat box
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  userInput.value = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language }),
    });

    const data = await response.json();

    if (data.error) {
      chatBox.innerHTML += `<div class="message error">⚠️ Error: ${data.error}</div>`;
    } else {
      // Show bot reply
      chatBox.innerHTML += `<div class="message bot"><strong>Bot (${language}):</strong> ${data.reply}</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<div class="message error">⚠️ Error: ${error.message}</div>`;
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
