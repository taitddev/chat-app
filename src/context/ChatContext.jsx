import { createContext, useContext, useState } from "react";
import axios from "axios";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const value = {
    conversations,
    setConversations,
    currentChat,
    setCurrentChat,
    messages,
    setMessages,
    arrivalMessage,
    setArrivalMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

function useChat() {
  const context = useContext(ChatContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { ChatContextProvider, useChat };
