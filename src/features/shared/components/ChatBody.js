import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import { socket } from "../../../sockets";
import ChatCurrentlyTyping from "./ChatCurrentlyTyping";
import ChatMessage from "./ChatMessage";
import ChatSendMessage from "./ChatSendMessage";

function ChatBody({
  messages,
  usersCount,
  hideChatWidget,
  onMessageReact,
  childRef,
}) {
  const user = useSelector(selectUser);
  const [usersCurrentlyTyping, setUsersCurrentlyTyping] = useState([]);

  console.log(usersCurrentlyTyping);

  useEffect(() => {
    socket.on("receive-chat-typing", (data) => {
      if (data.typing) {
        if (
          !usersCurrentlyTyping.find((item) => item.user.id === data.user.id)
        ) {
          setUsersCurrentlyTyping([...usersCurrentlyTyping, data]);
        }
      } else {
        setUsersCurrentlyTyping(
          usersCurrentlyTyping.filter((item) => item.user.id !== data.user.id)
        );
      }
    });
  }, []);

  return (
    <>
      <div className="chat-body-wrapper">
        <div className="center">
          <div className="chat">
            <div
              className="contact bar cursor-pointer"
              onClick={hideChatWidget}
            >
              <div className="d-flex flex-row p-1 align-items-center justify-content-between mt-1 ms-2">
                {user._id ? (
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle"
                      src={`https://mern-online-properties.herokuapp.com/images/avatars/${user?.avatar}`}
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
                <i className="far fa-times-circle chat-close-button"></i>
              </div>
            </div>
            <div className="messages" id="chat" ref={childRef}>
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
              {usersCurrentlyTyping.map((typingUser, i) => (
                <ChatCurrentlyTyping
                  currentUser={user}
                  key={i}
                  typingUser={typingUser}
                />
              ))}
            </div>
            <ChatSendMessage user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBody;
