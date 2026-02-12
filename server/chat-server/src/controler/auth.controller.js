const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const signUp = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            (err) => {
                if (err) {
                    // 🔥 Handle duplicate username
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            message: "Username already exists"
                        });
                    }

                    console.error(err);
                    return res.status(500).json({ message: "Database error" });
                }

                res.status(201).json({ message: "Signup successful" });
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signUp };