import moment from "moment";
import React, { useMemo, useState } from "react";
import { socket } from "../../../sockets";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";

function ChatSendMessage({ user }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (!currentMessage) return;
    await socket.emit("message-send", {
      body: currentMessage,
      authorId: user._id,
      authorName: user.fullName,
      authorAvatar: user.avatar,
      time: moment().format("D MMM, HH:mm"),
      id: uuidv4(),
      reactions: {},
    });
    setCurrentMessage("");
  };

  const onInputChange = async (e) => {
    setCurrentMessage(e.target.value);
    await socket.emit("chat-currently-typing", {
      typing: true,
      user: {
        avatar: user.avatar,
        id: user._id,
        name: user.fullName,
      },
    });
    debouncedEventHandler();
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const typingTimeOut = async () => {
    await socket.emit("chat-currently-typing", {
      typing: false,
      userAvatar: user.avatar,
    });
  };

  const debouncedEventHandler = useMemo(() => debounce(typingTimeOut, 500), []);

  return (
    <>
      <div className="input">
        <input
          placeholder={
            !user._id
              ? "Sign in to leave a message!"
              : "Type your message here!"
          }
          disabled={!user._id}
          value={currentMessage}
          type="text"
          onChange={onInputChange}
          onKeyPress={handleEnterPress}
          autoFocus
        />
        <i
          className={`fas fa-paper-plane ${
            !currentMessage ? "disabled-chat-icon" : ""
          }`}
          onClick={sendMessage}
        ></i>
      </div>
    </>
  );
}

export default ChatSendMessage;
