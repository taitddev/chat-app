import React from "react";

const AvatarGenerate = ({ imageBase64, nameGenerate }) => {
  if (imageBase64)
    return (
      <>
        <img
          src={`data:image/svg+xml;base64,${imageBase64}`}
          alt="avatar"
          className="w-12"
        />
      </>
    );

  if (nameGenerate) {
    const name = nameGenerate
      .split(" ")
      .slice(0, 2)
      .map((i) => i[0])
      .join("");
    return (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-pistachio">
        <p className="text-xl font-bold">{name}</p>
      </div>
    );
  }
};

export default AvatarGenerate;
