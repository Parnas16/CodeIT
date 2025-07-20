// Load environment variables
require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from 'public' folder
app.use(express.static("public"));

// Check if API key is loaded
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) {
  console.error("❌ OpenRouter API key not found in .env");
}

io.on("connection", (socket) => {
  console.log("✅ A user connected");

  socket.on("chat message", async (msg) => {
    console.log("💬 User:", msg);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: msg },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.choices[0].message.content;
      console.log("🤖 Bot:", reply);
      socket.emit("chat message", `🤖 Bot: ${reply}`);
    } catch (error) {
      console.error("❌ OpenRouter Error:", error.response?.data || error.message);
      socket.emit("chat message", "🤖 Bot: Sorry, I couldn't respond right now.");
    }
  });

  socket.on("disconnect", () => {
    console.log("👋 User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
