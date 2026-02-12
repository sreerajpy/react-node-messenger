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
            socket.user = decoded; // { userId }
            next();
        } catch (err) {
            next(new Error("Unauthorized"));
        }
    });


    io.on("connection", (socket) => {
        console.log("User connected:", socket.user.userId);
        socketController(io, socket);
    });
};
