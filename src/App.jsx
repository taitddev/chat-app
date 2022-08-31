import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/set-avatar" element={<SetAvatar />}></Route>
          <Route path="/" element={<Chat />}></Route>
        </Routes>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;
