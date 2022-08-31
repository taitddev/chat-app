import React from "react";
import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

import { useAuth } from "../../context/AuthContext";

import AvatarGenerate from "../Avatar/AvatarGenerate";

const ConversationItem = ({ conversation, isSelected }) => {
  const { user } = useAuth();

  // TODO: Chưa xây dựng tính năng chat group nên tạm thời chỉ lấy ra 1 user trong cuộc hội thoại
  const usersInConversation = conversation.users.filter(
    (item) => item._id !== user._id
  )[0];

  return (
    <>
      <div className="flex gap-2 w-full items-center px-2">
        {usersInConversation && usersInConversation.avatarImage ? (
          <AvatarGenerate imageBase64={usersInConversation.avatarImage} />
        ) : (
          <AvatarGenerate nameGenerate={usersInConversation.fullname} />
        )}

        <div className="ml-2 flex-grow flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{conversation.name}</p>
            <p className="text-sm text-gray-400">
              {moment(conversation.lastMessage.createdAt).fromNow()}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xs text-gray-200">
              {conversation?.lastMessage?.message.text}
            </h3>
            <div
              className={`w-6 h-6 flex items-center justify-center ${
                isSelected ? "bg-charlestonGreen" : "bg-onyx"
              } rounded-full`}
            >
              <p className="text-xs">15</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationItem;
