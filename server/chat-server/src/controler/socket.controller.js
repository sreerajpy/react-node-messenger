const db = require("../config/db");

module.exports = (io, socket) => {

    const currentUserId = socket.user.userId;

    // Join personal room based on their ID
    socket.join(currentUserId);

    console.log(`User ${currentUserId} joined their private room.`);

    // Private message
    socket.on("privateMessage", async ({ toUserId, message }) => {
        try {
            // 2. The 'await' here works now because we used mysql2/promise
            await db.query(
                "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?,?,?)",
                [currentUserId, toUserId, message]
            );

            // 3. Send to the recipient's private room
            // Note: toUserId must match how they joined their room (as a string/number)
            io.to(toUserId).emit("receivePrivateMessage", {
                from: currentUserId,
                message: message,
                time: new Date().toLocaleTimeString()
            });

            console.log(`Message sent from ${currentUserId} to ${toUserId}`);

        } catch (err) {
            console.error("Database Error:", err.message);
            socket.emit("error", "Message could not be saved.");
        }


        io.to(toUserId).emit("receivePrivateMessage", {
            from: currentUserId,
            message,
            time: new Date().toLocaleTimeString()
        });
    });
    // cleanup
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.user.userId);
    });
};
