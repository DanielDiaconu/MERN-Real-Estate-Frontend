import React, { useRef, useState } from "react";
import useOnClickOutside from "../hooks/ClickOutside";
import ChatMessageReactionBar from "./ChatMessageReactionBar";

function ChatMessageReaction({ user, message }) {
  const [showBar, setShowBar] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setShowBar(false);
  });

  const handleShowReactionBar = (data) => {
    setShowBar(data);
  };

  return (
    <div className="react-message position-relative" ref={ref}>
      {showBar && (
        <ChatMessageReactionBar
          message={message}
          user={user}
          handleShowReactionBar={handleShowReactionBar}
        />
      )}
      <i
        class="far fa-laugh reaction-button cursor-pointer"
        title="Add your reaction"
        onClick={() => setShowBar((prev) => !prev)}
      ></i>
    </div>
  );
}

export default ChatMessageReaction;
