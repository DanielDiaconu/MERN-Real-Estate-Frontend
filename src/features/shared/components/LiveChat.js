import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { socket } from "../../../sockets";

function LiveChat() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = [];

  const sendMessage = () => {
    socket.emit("send-message", {
      messageBody: currentMessage,
      author: {
        name: user.fullName,
        userId: user._id,
        avatar: user.avatar,
      },
    });
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      console.log(data.body);
    });
  }, []);

  return (
    <div className="container">
      <div className="live-chat-container">
        <i
          class="fas fa-comments"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        ></i>
      </div>
      <div
        class="offcanvas offcanvas-end chat-offcanvas-container"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header chat-off-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            Chat Room
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body chat-off-body">
          <p>Welcome to our live chat room!</p>
          <div className="d-flex justify-content-between chat-body">
            <div id="chat">
              <p>Message</p>
            </div>
            <div id="user-chat">
              <p>Message</p>
            </div>
          </div>
        </div>
        <div className="d-flex" style={{ height: "50px" }}>
          <input
            type="text"
            className="message-input col-10"
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
