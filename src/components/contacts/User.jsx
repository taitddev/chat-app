import React from "react";
import AvatarGenerate from "../Avatar/AvatarGenerate";

const User = ({ user }) => {
  return (
    <>
      <div className="p-4 rounded-md hover:bg-charlestonGreen flex cursor-pointer">
        {user && user.avatarImage ? (
          <AvatarGenerate imageBase64={user.avatarImage} />
        ) : (
          <AvatarGenerate nameGenerate={user.fullname} />
        )}

        <div className="ml-3">
          <p className="font-semibold mb-1">{user.fullname}</p>
          <p className="text-sm text-gray-300">{user.username}</p>
        </div>
      </div>
    </>
  );
};

export default User;
