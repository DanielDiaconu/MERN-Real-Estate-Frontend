import userEvent from "@testing-library/user-event";
import moment from "moment";
import React, { useState } from "react";
import { socket } from "../../../sockets";
import { v4 as uuidv4 } from "uuid";

function ChatSendMessage({ user }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (!currentMessage) return;
    await socket.emit("message-send", {
      body: currentMessage,
      authorId: user._id,
      authorName: user.fullName,
      authorAvatar: user.avatar,
      time: moment().format("HH:mm"),
      id: uuidv4(),
      reactions: {},
    });
    setCurrentMessage("");
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <div class="input">
        <input
          placeholder={
            !user._id
              ? "Sign in to leave a message!"
              : "Type your message here!"
          }
          disabled={!user._id}
          value={currentMessage}
          type="text"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleEnterPress}
        />
        <i
          class={`fas fa-paper-plane ${
            !currentMessage ? "disabled-chat-icon" : ""
          }`}
          onClick={sendMessage}
        ></i>
      </div>
    </>
  );
}

export default ChatSendMessage;
