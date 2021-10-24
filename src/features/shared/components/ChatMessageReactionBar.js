import React, { useRef } from "react";
import { socket } from "../../../sockets";

function ChatMessageReactionBar({ message, user, handleShowReactionBar }) {
  const selectEmoji = async (e) => {
    await socket.emit("chat-message-reaction", {
      type: e.target.dataset.name,
      messageId: message.id,
      userId: user._id,
    });
    handleShowReactionBar(false);
  };

  return (
    <div className="message-reaction-icons">
      <div className="reaction-icons">
        <i
          className="fas fa-heart cursor-pointer"
          data-name="heart"
          onClick={selectEmoji}
        ></i>
        <i
          className="fas fa-sad-cry cursor-pointer"
          data-name="sad-cry"
          onClick={selectEmoji}
        ></i>
        <i
          className="fas fa-laugh-squint cursor-pointer"
          data-name="laugh-squint"
          onClick={selectEmoji}
        ></i>
        <i
          className="fas fa-angry cursor-pointer"
          data-name="angry"
          onClick={selectEmoji}
        ></i>
      </div>
    </div>
  );
}

export default ChatMessageReactionBar;
