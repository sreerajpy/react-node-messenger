const messageService = require("../services/message.service");

exports.handleSocket = (io, socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async (text) => {
        try {
            await messageService.saveMessage(socket.id, text);

            io.emit("receiveMessage", {
                id: socket.id,
                text,
                time: new Date().toLocaleTimeString(),
            });
        } catch (err) {
            console.error("Message save failed", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
};