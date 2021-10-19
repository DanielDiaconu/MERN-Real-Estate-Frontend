import React from "react";

const initMessage = {
  body: "",
  time: "",
  authorId: "",
  authorAvatar: "",
  authorName: "",
};

function ChatMessage({ user, message }) {
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
          </div>
          <span
            className={`text-muted message-time   ${
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
