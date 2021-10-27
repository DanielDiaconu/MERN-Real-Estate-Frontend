import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { socket } from "../../../sockets";
import ChatBody from "./ChatBody";
import ChatMessagePreview from "./ChatMessagePreview";

function ChatIcon() {
  const [toggleChat, setToggleChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const chatBodyRef = useRef();

  const onMessageReact = async (userId, reactkey, messageId) => {
    await socket.emit("react-message-count", {
      userId: userId,
      reactkey: reactkey,
      messageId: messageId,
    });
  };
  const toggleChatBody = () => {
    setToggleChat((prev) => !prev);
    setMessageCount(0);
  };

  const debouncedHandler = useMemo(
    () => debounce(() => setShowNewMessage(false), 3000),
    []
  );

  console.log(showNewMessage);

  const hideChatWidget = () => {
    setToggleChat(false);
    setMessageCount(0);
  };

  useEffect(() => {
    socket.on("receive-chat-message", (data) => {
      if (!data.isInformationalBanner) {
        setMessageCount((prev) => prev + 1);
        setNewMessage(data);
        setShowNewMessage(true);
        debouncedHandler();
      }
      setMessages((list) => [...list, data]);
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    });
    socket.on("live-chat-count", (data) => {
      setConnectedUsers(data);
    });
    socket.on("receive-chat-reaction", (data) => {
      setMessages((list) => {
        return list.map((message) => {
          if (message.id === data.messageId) {
            return {
              ...message,
              reactions: {
                ...message.reactions,
                [data.type]: message.reactions[data.type]
                  ? !message.reactions[data.type].includes(data.userId)
                    ? [...message.reactions[data.type], data.userId]
                    : message.reactions[data.type].filter(
                        (item) => item !== data.userId
                      )
                  : [data.userId],
              },
            };
          }
          return message;
        });
      });
    });
    socket.on("receive-react-count", ({ userId, reactkey, messageId }) => {
      setMessages((list) => {
        return list.map((message) => {
          if (message.id === messageId) {
            return {
              ...message,
              reactions: {
                ...message.reactions,
                [reactkey]: !message?.reactions[reactkey]?.includes(userId)
                  ? [...message.reactions[reactkey], userId]
                  : message?.reactions[reactkey]?.filter(
                      (item) => item !== userId
                    ),
              },
            };
          }
          return message;
        });
      });
    });
  }, []);

  return (
    <>
      <div className="chat-icon-wrapper">
        {messageCount > 0 && !toggleChat && (
          <div className="chat-icon-message-count">
            <span>{messageCount}</span>
          </div>
        )}
        <div className="chat-widget cursor-pointer" onClick={toggleChatBody}>
          <a className="chat-widget--button">
            <svg viewBox="0 0 41 36" className="chat-widget--icon">
              <path d="M34.7 5.2C38.6 8.6 40.7 13.2 40.7 18 40.7 22.8 38.6 27.4 34.7 30.8 31 34.2 26 36 20.7 36 19.1 36 17.5 35.8 16 35.5 15.2 35.3 14.7 34.5 14.9 33.7 15.1 32.9 15.8 32.4 16.6 32.6 17.9 32.9 19.3 33 20.7 33 30.1 33 37.7 26.3 37.7 18 37.7 9.7 30.1 3 20.7 3 11.3 3 3.6 9.7 3.6 18 3.6 21.4 4.9 24.7 7.3 27.4 7.7 27.8 7.8 28.4 7.6 28.9 7.2 30 6.7 30.9 6 31.8 7.2 31.7 8.6 31.3 9.8 30.6 10.5 30.1 11.5 30.4 11.9 31.1 12.3 31.8 12.1 32.7 11.4 33.1 8.3 35 5 34.9 3.3 34.6 2.5 34.5 1.8 33.9 1.7 33.1 1.5 32.3 1.8 31.4 2.5 31 3.4 30.4 4 29.6 4.5 28.6 2 25.6 0.7 21.8 0.7 18 0.7 13.2 2.8 8.6 6.6 5.2 10.4 1.8 15.4 0 20.7 0 26 0 31 1.8 34.7 5.2ZM20.7 20C19.6 20 18.7 19.1 18.7 18 18.7 16.9 19.6 16 20.7 16 21.7 16 22.6 16.9 22.6 18 22.6 19.1 21.7 20 20.7 20ZM26.7 20C25.6 20 24.8 19.1 24.8 18 24.8 16.9 25.6 16 26.7 16 27.8 16 28.6 16.9 28.6 18 28.6 19.1 27.8 20 26.7 20ZM14.6 20C13.6 20 12.7 19.1 12.7 18 12.7 16.9 13.6 16 14.6 16 15.7 16 16.6 16.9 16.6 18 16.6 19.1 15.7 20 14.6 20Z"></path>
            </svg>
          </a>
        </div>
        {toggleChat && (
          <ChatBody
            onMessageReact={onMessageReact}
            messages={messages}
            usersCount={connectedUsers}
            hideChatWidget={hideChatWidget}
            childRef={chatBodyRef}
          />
        )}
        {showNewMessage && <ChatMessagePreview message={newMessage} />}
      </div>
    </>
  );
}

export default ChatIcon;
