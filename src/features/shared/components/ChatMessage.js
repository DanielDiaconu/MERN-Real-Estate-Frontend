import React, { useEffect, useRef, useState } from "react";
import ChatMessageReaction from "./ChatMessageReaction";
import ChatMessageReactionList from "./ChatMessageReactionList";

const initMessage = {
  body: "",
  time: "",
  authorId: "",
  authorAvatar: "",
  authorName: "",
  isInformationalBanner: false,
  id: "",
  reactions: {},
};

function ChatMessage({ user, message, onMessageReact }) {
  const isSameAuthor = () => {
    return message?.authorId === user?._id;
  };

  const handleChatMessageReact = (userId, reactKey) => {
    onMessageReact(userId, reactKey, message.id);
  };

  return (
    <>
      <div
        className={`d-flex align-items-end chat-message-wrapper-spacing  ${
          !isSameAuthor() ? "flex-row-reverse justify-content-end" : ""
        }`}
      >
        <div
          className={`d-flex w-100 align-items-center ${
            isSameAuthor() ? "flex-row-reverse" : ""
          }  position-relative`}
        >
          <div
            title={message?.time}
            className={`message ${isSameAuthor() ? "from-myself" : ""} `}
          >
            {message?.body}
          </div>
          <ChatMessageReactionList
            isSameAuthor={isSameAuthor()}
            reactions={message?.reactions}
            handleChatMessageReact={handleChatMessageReact}
          />
          <ChatMessageReaction user={user} message={message} />
        </div>
        <img
          title={message?.authorName}
          className="rounded-circle chat-avatar-img"
          src={`https://mern-online-properties.herokuapp.com/images/avatars/${message?.authorAvatar}`}
        />
      </div>
    </>
  );
}

export default ChatMessage;
