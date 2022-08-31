import React from "react";
import { useChat } from "../../context/ChatContext";

import User from "./User";

const SearchedUsers = ({ users }) => {
  const { setCurrentChat } = useChat();

  return (
    <>
      <div>
        <p className="bg-onyx px-4 py-2 text-sm">
          {users.length} người dùng được tìm thấy
        </p>
        <div className="p-4 flex flex-col gap-5">
          {users.map((user) => (
            <div
              key={user._id}
              className=""
              onClick={() => {
                setCurrentChat(user);
              }}
            >
              <User user={user} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchedUsers;
