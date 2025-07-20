const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (message) {
    const userLi = document.createElement("li");
    userLi.textContent = message;
    userLi.classList.add("user-message");
    messages.appendChild(userLi);

    socket.emit("chat message", message);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const botLi = document.createElement("li");
  botLi.textContent = msg;
  botLi.classList.add("bot-message");
  messages.appendChild(botLi);
  messages.scrollTop = messages.scrollHeight;
});
