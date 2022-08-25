import React from "react";

const Authentication = ({ children }) => {
  return (
    <div className="container">
      <div className="flex flex-col gap-10 w-full max-w-2xl text-center bg-richBlack rounded-xl p-20">
        {children}
      </div>
    </div>
  );
};

export default Authentication;
