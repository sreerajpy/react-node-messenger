const db = require('../config/db')

const saveMessage = (senderId, text) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO messages (sender_socket_id, message) VALUES (?, ?)",
            [senderId, text],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });
};

const getMessages = () => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM messages ORDER BY created_at ASC",
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

module.exports = { saveMessage, getMessages, };