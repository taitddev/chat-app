import React from "react";
import logo from "../assets/logo.svg";

const Logo = ({ size = "normal" }) => {
  return (
    <>
      <div className="flex uppercase gap-2 items-center mx-auto">
        <img src={logo} alt="logo" className="w-10" />
        <p className={`text-3xl font-bold text-mediumPurple`}>Snappy</p>
      </div>
    </>
  );
};

export default Logo;
