import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import ChatMessage from "../../user/components/ChatMessage";
import ChatSendMessage from "./ChatSendMessage";

function ChatBody({ messages, usersCount }) {
  const user = useSelector(selectUser);

  return (
    <>
      <div className="chat-body-wrapper">
        <div class="center">
          <div class="chat">
            <div class="contact bar">
              <h4>Live Chat</h4>
            </div>
            <div class="messages" id="chat">
              {usersCount <= 1 && (
                <div className="time">
                  You are the only one connected in the global chat.
                </div>
              )}
              {messages?.map((message, i) => (
                <ChatMessage user={user} message={message} key={i} />
              ))}
              {/* <div class="message stark">
                <div class="typing typing-1"></div>
                <div class="typing typing-2"></div>
                <div class="typing typing-3"></div>
              </div> */}
            </div>
            <ChatSendMessage user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBody;
