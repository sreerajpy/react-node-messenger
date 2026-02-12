module.exports = (io, socket) => {
    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", {
            userId: socket.user.userId,
            text: message,
            time: new Date().toLocaleTimeString(),
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.user.userId);
    });
};
