const express = require("express");
const cors = require("cors");
const messageRoutes = require("./src/routes/message.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/messages", messageRoutes);

module.exports = app;
