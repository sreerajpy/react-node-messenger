import React, { useEffect, useState } from "react";
import socket from "../socket";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";



const ChatPage = ({onLogout}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetch users list
  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setUsers);
  }, []);

  // Receive private messages
  useEffect(() => {
    socket.on("receivePrivateMessage", (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => socket.off("receivePrivateMessage");
  }, []);

  // Load chat history
  useEffect(() => {
    if (!selectedUser) return;

    fetch(`http://localhost:5000/messages/${selectedUser.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setMessages);
  }, [selectedUser]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatList
        users={users}
        selectedUser={selectedUser}
        onSelect={setSelectedUser}
      />
      <ChatWindow
        selectedUser={selectedUser}
        messages={messages}
        onSend={(text) => {
          socket.emit("privateMessage", {
            toUserId: selectedUser.id,
            message: text,
          });

          setMessages(prev => [
            ...prev,
            { from: "me", message: text },
          ]);
        }}
      />
    </div>
  );
};

export default ChatPage;
