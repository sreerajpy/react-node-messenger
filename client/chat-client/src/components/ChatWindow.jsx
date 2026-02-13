import React, { useState } from "react";

const ChatWindow = ({ selectedUser, messages, onSend }) => {
  const [text, setText] = useState("");

  if (!selectedUser) {
    return (
      <div style={{ width: "70%", padding: "20px" }}>
        <h3>Select a user to start chatting</h3>
      </div>
    );
  }

  return (
    <div style={{
      width: "70%",
      display: "flex",
      flexDirection: "column"
    }}>
      <h3 style={{ padding: "10px" }}>
        Chat with {selectedUser.username}
      </h3>

      <div style={{
        flex: 1,
        padding: "10px",
        overflowY: "auto",
        borderTop: "1px solid #ccc",
        borderBottom: "1px solid #ccc"
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.from === "me" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <span style={{
              background: "#f1f1f1",
              padding: "6px 10px",
              borderRadius: "5px",
              display: "inline-block",
            }}>
              {msg.message}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", padding: "10px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
          placeholder="Type a message"
        />
        <button
          onClick={() => {
            onSend(text);
            setText("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
