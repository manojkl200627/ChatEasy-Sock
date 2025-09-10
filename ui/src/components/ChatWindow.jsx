import React, { useEffect, useState } from "react";
import axios from "axios"; // <-- make sure this is here

const bkuri = import.meta.env.VITE_BACK;

const ChatWindow = ({ socket, selectedUser }) => {
  const me = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  // Send Message
  const sendMessage = async () => {
    if (!msg.trim()) return;

    try {
      await axios.post(`${bkuri}/api/mes/addmsg`, {   // 👈 FIXED
        from: me._id,
        to: selectedUser._id,
        message: msg,
      });

      // Emit real-time event
      socket.emit("send-msg", {
        from: me._id,
        to: selectedUser._id,
        message: msg,
      });

      setMessages((prev) => [...prev, { fromSelf: true, message: msg }]);
      setMsg("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("msg-receive", (data) => {
        setMessages((prev) => [...prev, { fromSelf: false, message: data }]);
      });
    }
  }, [socket]);

  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a user to start chat
      </div>
    );

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.fromSelf ? "message self" : "message other"}
          >
            {m.message}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
