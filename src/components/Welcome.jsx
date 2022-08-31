import React, { useState, useEffect } from "react";
import Robot from "../assets/robot.gif";

import { useAuth } from "../context/AuthContext";

export default function Welcome() {
  const [fullname, setFullname] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    setFullname(user?.fullname);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-10">
      <img src={Robot} alt="" className="w-80" />
      <div className="text-center">
        <h1 className="mb-5">
          Xin chào, <span className="text-mediumPurple">{fullname}!</span>
        </h1>
        <h3>Vui lòng chọn một cuộc trò chuyện để bắt đầu nhắn tin.</h3>
      </div>
    </div>
  );
}
