import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import ChatIcon from "./ChatIcon";

function LiveChat() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return <> </>;
  }

  return (
    <div className=" chat-wrapper">
      <ChatIcon />
    </div>
  );
}

export default LiveChat;
