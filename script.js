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

languageSelector.addEventListener("change", updateCourseContent);
updateCourseContent();

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  const lang = languageSelector.value;

  // Show user message in chat box
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  userInput.value = "";

  try {
    // Use full backend URL here
    const response = await fetch("https://79676942-eb03-45d9-9b38-cae3b780966a-00-2b4oz1kmfoihd.pike.replit.dev/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language: lang }),
    });

    const rawText = await response.text();
    console.log("Raw response text:", rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.warn("JSON.parse failed, falling back to plain text");
      data = { reply: rawText };
    }

    if (data.error) {
      chatBox.innerHTML += `<div class="message error">⚠️ Error: ${data.error}</div>`;
    } else {
      chatBox.innerHTML += `<div class="message bot"><strong>Bot (${lang}):</strong> ${data.reply}</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<div class="message error">⚠️ Error: ${err.message}</div>`;
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
