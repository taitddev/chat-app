import React from "react";
import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { BsBell, BsMoon, BsSun } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import useDarkMode from "../hooks/useDarkMode";

const ChatHeader = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-end gap-5 px-10 items-center w-full h-16 bg-white dark:bg-charlestonGreen shadow-lg border-b-2 border-gray-800">
        <div className="relative">
          <BsBell size="26" className="top-navigation-icon" />
          <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-xs">
            10
          </div>
        </div>

        <ThemeIcon />
        <img
          src={`data:image/svg+xml;base64,${user.avatarImage}`}
          alt="avatar"
          className="w-8 cursor-pointer select-none"
        />
      </div>
    </>
  );
};

export default ChatHeader;

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => {
    console.log("test");
    setDarkTheme(!darkTheme);
  };
  return (
    <div onClick={handleMode} className="cursor-pointer">
      {darkTheme ? (
        <BsSun size="28" className="top-navigation-icon" />
      ) : (
        <BsMoon size="28" className="top-navigation-icon" />
      )}
    </div>
  );
};
