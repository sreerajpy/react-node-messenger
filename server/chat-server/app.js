const express = require("express");
const cors = require("cors");
const messageRoutes = require("./src/routes/message.routes");
const authRoutes = require("./src/routes/auth.routes");
const authMiddleware = require("./src/middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/messages", authMiddleware, messageRoutes);
app.use("/auth", authRoutes);
module.exports = app;
