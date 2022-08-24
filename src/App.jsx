import { Routes, Route } from "react-router-dom";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Join />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  );
}

export default App;
