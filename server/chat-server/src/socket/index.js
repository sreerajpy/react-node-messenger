require("dotenv").config();

const jwt = require('jsonwebtoken');
const { Server } = require("socket.io");
const socketController = require("../controler/socket.controller");

module.exports = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" },
    });
    //  JWT validation before connection
    io.use((socket, next) => {

        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Unauthorized"));
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            next();
        } catch (err) {
            console.error("❌ JWT Verification Error:", err.message); // THIS WILL TELL YOU WHY
            next(new Error("Unauthorized"));
        }
    });


    io.on("connection", (socket) => {
        socketController(io, socket);
    });
};
