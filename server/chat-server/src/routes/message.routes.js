const express = require("express");

const router = express.Router();
const messageController = require("../controler/message.controller");
router.get("/", messageController.getAllMessages);

module.exports = router;