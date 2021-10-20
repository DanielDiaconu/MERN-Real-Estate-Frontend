import React, { useEffect, useState } from "react";
import { socket } from "../../../sockets";
import ChatMessageReaction from "./ChatMessageReaction";

const initMessage = {
  body: "",
  time: "",
  authorId: "",
  authorAvatar: "",
  authorName: "",
  isInformationalBanner: false,
};

function ChatMessage({ user, message }) {
  const [reaction, setReaction] = useState(false);
  const [messageReactions, setMessageReactions] = useState([]);

  const toggleReaction = () => {
    setReaction((prev) => !prev);
  };
  const isSameAuthor = () => {
    return message?.authorId === user?._id;
  };

  return (
    <>
      <div
        className={`d-flex align-items-end ${
          !isSameAuthor() ? "flex-row-reverse justify-content-end" : ""
        } mb-3`}
      >
        <div className="d-flex w-100 flex-column position-relative">
          <div className={`message ${isSameAuthor() ? "from-myself" : ""} `}>
            {message?.body}

            {reaction && (
              <div className="position-absolute message-reaction-icons">
                <ChatMessageReaction message={message} />
              </div>
            )}
          </div>
          <i class="far fa-laugh reaction-button" onClick={toggleReaction}></i>
          <span
            className={`text-muted message-time ${
              isSameAuthor() ? "from-myself" : ""
            }`}
          >
            {message?.time}
          </span>
        </div>
        <img
          title={message?.authorName}
          className="rounded-circle chat-avatar-img"
          src={`http://localhost:8080/images/avatars/${message?.authorAvatar}`}
        />
      </div>
    </>
  );
}

export default ChatMessage;
