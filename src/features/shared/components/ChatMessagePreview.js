import React from "react";

function ChatMessagePreview({ message }) {
  console.log(message);
  return (
    <div className="chat-message-preview">
      <span>{message?.authorName}</span>
      <p>{message?.body}</p>
    </div>
  );
}

export default ChatMessagePreview;
