import React from "react";
import { socket } from "../../../sockets";

function ChatMessageReaction({ message }) {
  const selectEmoji = async (e) => {
    console.log(e.target.className);
    await socket.emit("message-reaction", {
      reactionType: e.target.className,
      reactedMessage: message.messageId,
    });
  };
  return (
    <div className="reaction-icons">
      <div name="heart" onClick={selectEmoji}>
        <i class="fas fa-heart"></i>
      </div>
      <i class="fas fa-sad-cry" onClick={selectEmoji}></i>
      <i
        class="fas fa-laugh-squint"
        name="laugh-squint"
        onClick={selectEmoji}
      ></i>
      <i class="fas fa-angry" name="angry" onClick={selectEmoji}></i>
    </div>
  );
}

export default ChatMessageReaction;
