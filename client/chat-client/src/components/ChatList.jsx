import React from "react";

const ChatList = ({ users, selectedUser, onSelect }) => {
  return (
    <div style={{
      width: "30%",
      borderRight: "1px solid #ccc",
      padding: "10px"
    }}>
      <h3>Users</h3>

      {users.map(user => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          style={{
            padding: "10px",
            cursor: "pointer",
            background:
              selectedUser?.id === user.id ? "#eee" : "transparent",
          }}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
