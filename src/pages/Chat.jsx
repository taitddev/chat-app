import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

import { host } from "../utils/APIRoutes";

import Contacts from "../components/contacts/Contacts";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [lastMessage, setLastMessage] = useState([]);

  const { user } = useAuth();
  const { arrivalMessage, setArrivalMessage } = useChat();

  // Set arrival message
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket.current]);

  // Redirect to login page if user is not logged in
  // Else set value to currentUser
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
    }
  }, []);

  // Add user to list online users
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Contacts />
        <ChatContainer socket={socket} />
      </div>
    </>
  );
};

export default Chat;
