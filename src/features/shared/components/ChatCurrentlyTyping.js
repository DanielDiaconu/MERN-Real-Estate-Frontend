import React, { useEffect, useState } from "react";
import { socket } from "../../../sockets";

function ChatCurrentlyTyping({ user }) {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState({});

  useEffect(() => {
    socket.on("receive-chat-typing", (data) => {
      setIsTyping(data.typing);
      setTypingUser(data.user);
    });
  }, []);

  const userCurrentlyTyping = () => {
    return user?._id === typingUser?.id;
  };

  return (
    <>
      {isTyping && (
        <div
          className={`d-flex ${
            userCurrentlyTyping() ? "flex-row-reverse" : ""
          } `}
        >
          <img
            title={typingUser?.fullName}
            className="rounded-circle chat-avatar-img"
            src={`http://localhost:8080/images/avatars/${typingUser?.avatar}`}
          />
          <div
            class={`message ${userCurrentlyTyping() ? "typing-myself" : ""}`}
          >
            <div class="typing typing-1"></div>
            <div class="typing typing-2"></div>
            <div class="typing typing-3"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatCurrentlyTyping;
