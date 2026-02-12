import { useEffect, useState, useRef } from "react"; // Added useRef here
import socket from "./socket";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      // Extract the string if 'text' is an object
      const cleanMessage = {
        id: data.id,
        // text: typeof data.text === 'object' ? data.text.message : data.text?.text,
        text: data.text?.text,

        time: data.time || new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, cleanMessage]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // Everything rendered to the screen must be inside a return statement
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <div style={{ height: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages?.map((msg, index) => {
          const isMe = msg.id === socket.id;
          {
            console.log("msg", msg);
          }
          return (
            <div
              key={index}
              style={{
                textAlign: isMe ? "right" : "left",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: isMe ? "#DCF8C6" : "#EEE",
                }}
              >
                {msg.text}
              </span>
              <div style={{ fontSize: 10, color: "#888" }}>{msg.time}</div>
            </div>
          );
        })}
        {/* This div acts as the anchor for auto-scrolling */}
        <div ref={bottomRef} />
      </div>

      {/* Added a basic input area so you can actually send messages */}
      <div style={{ marginTop: "10px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={() => {
          socket.emit("sendMessage", { text: message, id: socket.id, time: new Date().toLocaleTimeString() });
          setMessage("");
        }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;