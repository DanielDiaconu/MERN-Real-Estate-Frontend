import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectUser } from "../../../slices/userSlice";

const socket = io.connect("https://mern-online-properties.herokuapp.com");

function Sockets() {
  // const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);

  const joinRoom = () => {
    if (user.fullName && room !== "") {
      socket.emit("join-room", room);
    }
  };

  const sendMessage = async () => {
    const sentMessage = {
      username: user?.fullName,
      message,
      room,
    };

    await socket.emit("send-message", sentMessage);
  };

  useEffect(() => {
    // socket.on("connect", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });

    socket.on("new-message", (data) => {});
  }, [socket]);

  return (
    <div className="mt-5  d-flex flex-column">
      {/* <h3>join A chat</h3>
      <input
        type="text"
        placeholder="mike"
        onChange={(e) => setUsername(e.target.value)}
      /> */}
      <input
        type="text"
        placeholder="Room id"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join a room</button>

      <div>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default Sockets;
