const messageService = require("../services/message.service");

const getAllMessages = async (req, res) => {
    try {
        const messages = await messageService.getMessages();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Failed to load messages" });
    }
};
module.exports = { getAllMessages };