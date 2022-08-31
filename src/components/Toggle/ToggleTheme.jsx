import React from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

import useDarkMode from "../../hooks/useDarkMode";

const ToggleTheme = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();

  const handleMode = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <label className="flex items-center justify-center">
      <input
        type="checkbox"
        checked={darkTheme}
        className="hidden-input"
        onChange={() => {}}
        onClick={handleMode}
      />

      <div
        className={`inline-block w-[42px] h-[72px] relative cursor-pointer rounded-full p-1 transition-all ${
          darkTheme ? "bg-crayola" : "bg-gray-300"
        }`}
      >
        <div
          className={`transition-all w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow-sm ${
            darkTheme ? "translate-y-[29px]" : ""
          }`}
        >
          {darkTheme ? (
            <IoMoonOutline className="" fontSize={22} color="#3079F4" />
          ) : (
            <IoSunnyOutline className="" fontSize={22} color="#3079F4" />
          )}
        </div>
      </div>
    </label>
  );
};

export default ToggleTheme;
