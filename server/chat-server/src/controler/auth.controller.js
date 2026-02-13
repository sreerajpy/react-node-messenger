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

        // ✅ Await the promise directly. No callback function needed.
        await db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );

        res.status(201).json({ message: "Signup successful" });

    } catch (error) {
        // ✅ Handle database errors inside the catch block
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Username already exists" });
        }
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // ✅ Use array destructuring [rows] to get the result from the promise
        const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign(
                { userId: user.id, username: user.username }, // Consistency: Use 'id'
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.status(200).json({ token, userId: user.id });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Database error during login" });
    }
};

module.exports = { signUp, login };