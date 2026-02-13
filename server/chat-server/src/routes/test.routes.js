const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/test", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

module.exports = router;