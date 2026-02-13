require("dotenv").config();


const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// To check if the connection is working immediately:
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL database via Pool");
        connection.release(); // Very important: release the connection back to the pool!
    } catch (err) {
        console.error("❌ DB connection error:", err.message);
        process.exit(1);
    }
})();
module.exports = pool;
