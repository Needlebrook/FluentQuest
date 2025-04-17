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

function updateCourseMaterial() {
  const lang = languageSelector.value;
  courseContent.innerText = courseData[lang];
}

languageSelector.addEventListener("change", updateCourseMaterial);
updateCourseMaterial();

sendBtn.addEventListener("click", async () => {
  const message = userInput.value;
  if (!message) return;

  const lang = languageSelector.value;

  chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  userInput.value = "";

  const response = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language: lang }),
  });

  const data = await response.json();
  chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});
