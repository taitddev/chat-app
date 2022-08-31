import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

import { IoVideocamOutline, IoCallOutline } from "react-icons/io5";

import Welcome from "./Welcome";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  sendMessageRoute,
  getMessageByConversationIdRoute,
} from "../utils/APIRoutes";
import { getOtherUsers } from "../utils/getOtherUsers";

import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

import helloIcon from "../assets/hello.gif";
import AvatarGenerate from "./Avatar/AvatarGenerate";

export default function ChatContainer({ socket }) {
  const { user } = useAuth();
  const { currentChat } = useChat();

  const [messages, setMessages] = useState([]);
  console.log(
    "🚀 ~ file: ChatContainer.jsx ~ line 25 ~ ChatContainer ~ messages",
    messages
  );
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  // Get all messsages of current conversation
  useEffect(() => {
    if (!currentChat) return;

    async function fetchData() {
      const response = await axios.post(getMessageByConversationIdRoute, {
        conversationId: currentChat._id,
        from: user._id,
      });
      setMessages(response.data);
    }
    fetchData();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    // Check if conversationId, add new message, else create new conversation
    if (currentChat && currentChat.users) {
      const otherUsers =
        currentChat && getOtherUsers(currentChat.users, user._id);

      socket.current.emit("send-msg", {
        to: otherUsers._id,
        from: user._id,
        msg,
      });

      await axios.post(sendMessageRoute, {
        from: user._id,
        conversationId: currentChat._id,
        sender: user._id,
        message: msg,
      });
    } else {
      await axios.post(sendMessageRoute, {
        from: user._id,
        to: currentChat._id,
        conversationName: currentChat.fullname,
        message: msg,
      });
    }

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  // Set arrival message
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat ? (
        <div className={`grid-container`}>
          <div className="flex p-5 justify-between items-center">
            <div className="flex gap-4 items-center">
              {currentChat.avatarImage ? (
                <AvatarGenerate imageBase64={currentChat.avatarImage} />
              ) : (
                <AvatarGenerate
                  nameGenerate={currentChat.name || currentChat.fullname}
                />
              )}

              <div className="text-lg font-bold">
                <h3>{currentChat.name || currentChat.fullname}</h3>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <IoVideocamOutline fontSize={28} className="cursor-pointer" />
              <IoCallOutline fontSize={22} className="cursor-pointer" />
            </div>
          </div>

          <div className="p-5">
            {messages.length > 0 ? (
              <div className="chat-messages p-8 flex flex-col gap-4 overflow-auto h-full">
                {messages.map((message) => {
                  return (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div
                        className={`flex  ${
                          message.fromSelf ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div className="flex flex-col gap-2">
                          <div className={`flex items-center max-w-1/2`}>
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                message.fromSelf ? "bg-crayola" : "bg-onyx"
                              }`}
                            >
                              <p>{message.message}</p>
                            </div>
                          </div>

                          <p className="text-xs text-gray-300 text-right">
                            {moment(message.createdAt).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="bg-onyx bg-opacity-20 gap-8 p-6 rounded-lg flex flex-col text-center">
                  <p>Chưa có tin nhắn nào...</p>
                  <p className="text-sm">
                    Gửi tin nhắn hoặc nhấn vào lời chào bên dưới.
                  </p>

                  <img
                    src={helloIcon}
                    alt="hello icon"
                    className="p-2 w-48 mx-auto cursor-pointer rounded-lg hover:bg-darkGunmetal"
                  />
                </div>
              </div>
            )}
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
}
