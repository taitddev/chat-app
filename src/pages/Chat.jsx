import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import { useAuth } from "../context/AuthContext";
import { allUsersRoute, host } from "../utils/APIRoutes";

import Welcome from "../components/Welcome";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const { user, setUser } = useAuth();

  // Redirect to login page if user is not logged in
  // Else set value to currentUser
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // Set contacts data
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="container">
        <div className="h-[85vh] w-[85vw] bg-richBlack grid grid-cols-4 rounded-2xl">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          <div className="col-span-3 flex justify-center">
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
