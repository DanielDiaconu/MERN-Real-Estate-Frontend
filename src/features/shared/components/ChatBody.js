import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import ChatCurrentlyTyping from "./ChatCurrentlyTyping";
import ChatMessage from "./ChatMessage";
import ChatSendMessage from "./ChatSendMessage";

function ChatBody({ messages, usersCount, hideChatWidget, onMessageReact }) {
  const user = useSelector(selectUser);

  return (
    <>
      <div className="chat-body-wrapper">
        <div class="center">
          <div class="chat">
            <div class="contact bar cursor-pointer" onClick={hideChatWidget}>
              <div className="d-flex flex-row p-1 align-items-center justify-content-between mt-1 ms-2">
                {user._id ? (
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle"
                      src={`http://localhost:8080/images/avatars/${user?.avatar}`}
                      style={{ width: "35px", height: "35px" }}
                    />
                    <div className="d-flex flex-column ms-3">
                      <span className="chatting-as">
                        Currently chatting as:
                      </span>
                      <span className="user-name-text">{user?.fullName}</span>
                    </div>
                  </div>
                ) : (
                  <Link className="sign-in-chat" to="/login">
                    Sign in to start chatting!
                  </Link>
                )}
                <i class="far fa-times-circle chat-close-button"></i>
              </div>
            </div>
            <div class="messages" id="chat">
              {usersCount <= 1 && (
                <div className="time">
                  You are the only one connected in the global chat.
                </div>
              )}
              {messages?.map((message, i) =>
                !message.isInformationalBanner ? (
                  <ChatMessage
                    user={user}
                    message={message}
                    key={i}
                    onMessageReact={onMessageReact}
                  />
                ) : (
                  <div className="time mt-4 mb-2" key={i}>
                    {message.body}
                  </div>
                )
              )}

              <ChatCurrentlyTyping user={user} />
            </div>
            <ChatSendMessage user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBody;
