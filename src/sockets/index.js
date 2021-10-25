import io from "socket.io-client";

export const socket = io.connect(
  "https://mern-online-properties.herokuapp.com",
  {
    transports: ["websocket"],
    upgrade: false,
  }
);
