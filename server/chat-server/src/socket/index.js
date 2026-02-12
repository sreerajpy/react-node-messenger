const { Server } = require("socket.io");
const socketController = require("../controler/socket.controller");

module.exports = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    socketController.handleSocket(io, socket);
  });
};
