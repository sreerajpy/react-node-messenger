import { useEffect, useState, useRef } from "react";
import socket, { connectSocket } from "../socket/socket";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom whenever a new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    connectSocket(token);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.chatContainer}>
        {/* Chat Header */}
        <header style={styles.header}>
          <div style={styles.headerInfo}>
            <div style={styles.avatar}>#</div>
            <div>
              <h3 style={styles.headerTitle}>Global Room</h3>
              <p style={styles.headerStatus}>Online • {messages.length} messages</p>
            </div>
          </div>
        </header>

        {/* Messages Window */}
        <div style={styles.messageWindow} ref={scrollRef}>
          {messages.length === 0 && (
            <p style={styles.emptyState}>No messages yet. Start the conversation!</p>
          )}
          {messages.map((m, i) => {
            // Logic to check if message is from the current user
            // Replace 'currentUserId' with your actual logic/state if available
            const isMe = m.userId === "me"; 

            return (
              <div key={i} style={{
                ...styles.messageRow,
                flexDirection: isMe ? "row-reverse" : "row"
              }}>
                <div style={{
                  ...styles.bubble,
                  backgroundColor: isMe ? "#2563EB" : "#F3F4F6",
                  color: isMe ? "white" : "#1F2937",
                  borderRadius: isMe ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                }}>
                  {!isMe && <span style={styles.userIdLabel}>User {m.userId}</span>}
                  <div style={styles.messageText}>{m.text}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={sendMessage} style={styles.inputArea}>
          <input
            style={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
          />
          <button type="submit" style={styles.sendButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#E5E7EB", // Light grey background
    fontFamily: "'Inter', sans-serif",
  },
  chatContainer: {
    width: "100%",
    maxWidth: "500px",
    height: "85vh",
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    backgroundColor: "#DBEAFE",
    color: "#2563EB",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  headerTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },
  headerStatus: {
    margin: 0,
    fontSize: "12px",
    color: "#10B981", // Green status color
    fontWeight: "500",
  },
  messageWindow: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: "#FFFFFF",
  },
  messageRow: {
    display: "flex",
    width: "100%",
  },
  bubble: {
    maxWidth: "80%",
    padding: "10px 14px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  userIdLabel: {
    display: "block",
    fontSize: "10px",
    fontWeight: "700",
    marginBottom: "4px",
    textTransform: "uppercase",
    opacity: 0.6,
  },
  messageText: {
    fontSize: "14px",
    lineHeight: "1.5",
  },
  emptyState: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: "14px",
    marginTop: "20px",
  },
  inputArea: {
    padding: "16px",
    display: "flex",
    gap: "10px",
    borderTop: "1px solid #F3F4F6",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB",
    outline: "none",
    fontSize: "14px",
  },
  sendButton: {
    backgroundColor: "#2563EB",
    color: "white",
    border: "none",
    borderRadius: "12px",
    width: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.2s",
  }
};