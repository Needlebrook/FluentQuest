document.getElementById("send-btn").addEventListener("click", sendMessage);

function sendMessage() {
  const userInput = document.getElementById("user-input");
  const languageSelect = document.getElementById("language");
  const chatBox = document.getElementById("chat-box");

  const message = userInput.value.trim();
  const language = languageSelect.value;

  if (message === "") return;

  // Show user message
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  userInput.value = "";

  fetch("chat.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, language })
  })
    .then((res) => res.json())
    .then((data) => {
      chatBox.innerHTML += `<div class="message bot"><strong>Bot (${language}):</strong> ${data.reply}</div>`;
      chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch((err) => {
      chatBox.innerHTML += `<div class="message error">⚠️ Error: ${err.message}</div>`;
    });
}
