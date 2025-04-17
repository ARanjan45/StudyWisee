const chatBox = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(sender, message) {
  const msgElement = document.createElement("p");
  msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("You", message);
  userInput.value = "";

  fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: "default", message })

  })
    .then(res => res.json())
    .then(data => {
      appendMessage("Bot", data.response);
    })
    .catch(error => {
      console.error("Error:", error);
      appendMessage("Bot", "Sorry, something went wrong.");
    });
}

// Send on button click
sendBtn.addEventListener("click", sendMessage);

// Send on Enter key
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Auto focus input on page load
window.onload = () => {
  userInput.focus();
};
