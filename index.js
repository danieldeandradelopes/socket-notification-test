// socket-server/index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Criação do app e servidor
const app = express();
const server = http.createServer(app);

// Configuração do Socket.IO com CORS liberado
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Evento de conexão
io.on("connection", (socket) => {
  console.log("🔌 Novo cliente conectado:", socket.id);

  // Recebe mensagem do cliente
  socket.on("message", (msg) => {
    console.log("📨 Mensagem recebida:", msg);
    // Envia a mensagem para todos os clientes conectados
    io.emit("message", msg);
  });

  // Evento de desconexão
  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

// Inicia o servidor
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor Socket.IO rodando em http://localhost:${PORT}`);
});
