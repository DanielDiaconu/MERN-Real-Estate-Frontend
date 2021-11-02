import React, { useEffect, useState } from "react";
import { socket } from "../../../sockets";

function ChatCurrentlyTyping({ currentUser, typingUser }) {
  const [isTyping, setIsTyping] = useState(false);
  // const [typingUser, setTypingUser] = useState({});

  const userCurrentlyTyping = () => {
    return currentUser?._id === typingUser?.user?.id;
  };

  return (
    <>
      {typingUser?.typing && (
        <div
          className={`d-flex ${
            userCurrentlyTyping() ? "flex-row-reverse" : ""
          } `}
        >
          <img
            title={typingUser?.user?.fullName}
            className="rounded-circle chat-avatar-img"
            src={`https://mern-online-properties.herokuapp.com/images/avatars/${typingUser?.user?.avatar}`}
          />
          <div
            className={`message ${
              userCurrentlyTyping() ? "typing-myself" : ""
            }`}
          >
            <div className="typing typing-1"></div>
            <div className="typing typing-2"></div>
            <div className="typing typing-3"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatCurrentlyTyping;
