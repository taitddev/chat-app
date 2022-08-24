import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import io from "socket.io-client";

import "./Chat.css";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { search } = useLocation();
  useEffect(() => {
    console.log("test");
    const { name, room } = queryString.parse(search);

    socket = io(import.meta.env.VITE_SERVER_ENDPOINT);
    console.log("🚀 ~ file: Chat.jsx ~ line 23 ~ useEffect ~ socket", socket);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [search]);

  return (
    <div className="outerContainer">
      <div className="container"></div>
    </div>
  );
};

export default Chat;
