import React from "react";

function ChatMessagePreview({ message }) {
  return (
    <div className="position-relative">
      <div className="chat-message-preview">
        <span>{message?.authorName}</span>
        <p>{message?.body}</p>
      </div>
      <div class="message-preview-arrow"></div>
    </div>
  );
}

export default ChatMessagePreview;
