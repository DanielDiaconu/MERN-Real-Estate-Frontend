import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../slices/userSlice";
import { v4 as uuidv4 } from "uuid";

const initObject = {
  heart: [],
};

function ChatMessageReactionList({
  isSameAuthor,
  reactions,
  handleChatMessageReact,
}) {
  const [reacts, setReacts] = useState(initObject);
  const user = useSelector(selectUser);

  const renderEmoji = () => {
    if (isEmpty(reacts)) return;
    const emojis = [];
    for (const [key, value] of Object.entries(reacts)) {
      emojis.push(
        value?.length >= 1 && (
          <div
            key={uuidv4()}
            className="chat-react-message-icon"
            onClick={() => handleChatMessageReact(user._id, key)}
          >
            <i class={`fas fa-${key} cursor-pointer`} data-name={key}></i>
            <span>{value?.length}</span>
          </div>
        )
      );
    }

    return emojis;
  };

  useEffect(() => {
    setReacts(reactions);
  }, [reactions]);

  return (
    <div
      className={`position-absolute d-flex chat-react-message-list ${
        isSameAuthor ? "from-myself" : ""
      }`}
    >
      {renderEmoji()}
      {/* <div className="chat-react-message-icon">
        <i class="fas fa-heart cursor-pointer" data-name="heart"></i>
        <span>1</span>
      </div>
      <div className="chat-react-message-icon">
        <i class="fas fa-sad-cry cursor-pointer" data-name="heart"></i>
        <span>2</span>
      </div>
      <div className="chat-react-message-icon">
        <i class="fas fa-laugh-squint cursor-pointer" data-name="heart"></i>
        <span>3</span>
      </div>
      <div className="chat-react-message-icon">
        <i class="far fa-angry cursor-pointer" data-name="heart"></i>
        <span>4</span>
      </div> */}
    </div>
  );
}

export default ChatMessageReactionList;
