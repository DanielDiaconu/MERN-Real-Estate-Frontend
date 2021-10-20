import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import ChatMessage from "../../user/components/ChatMessage";
import ChatSendMessage from "./ChatSendMessage";

function ChatBody({ messages, usersCount, hideChatWidget }) {
  const user = useSelector(selectUser);

  return (
    <>
      <div className="chat-body-wrapper">
        <div class="center">
          <div class="chat">
            <div class="contact bar cursor-pointer" onClick={hideChatWidget}>
              <div className="d-flex flex-row p-1 align-items-center mt-1 ms-2">
                <div>
                  <img
                    className="rounded-circle"
                    src={`http://localhost:8080/images/avatars/${user?.avatar}`}
                    style={{ width: "35px", height: "35px" }}
                  />
                  <span className="user-name-text">{user?.fullName}</span>
                </div>
                <i class="fas fa-times me-1" style={{ fontSize: "18px" }}></i>
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
                  <ChatMessage user={user} message={message} key={i} />
                ) : (
                  <div className="time mt-4 mb-2" key={i}>
                    {message.body}
                  </div>
                )
              )}

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
