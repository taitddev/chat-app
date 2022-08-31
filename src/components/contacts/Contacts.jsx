import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { debounce } from "lodash";

import { IoSearch } from "react-icons/io5";

import { useAuth } from "../../context/AuthContext";

import { allConversationsRoute, getUsersRoute } from "../../utils/APIRoutes";

import ConversationItem from "./ConversationItem";
import SearchedUsers from "./SearchedUsers";
import { useChat } from "../../context/ChatContext";

const Contacts = () => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [filter, setFilter] = useState(undefined);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [contacts, setContacts] = useState([]);

  const { user } = useAuth();
  const { currentChat, setCurrentChat, conversations, setConversations } =
    useChat();

  // Set conversations data
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`${allConversationsRoute}/${user?._id}`);
      setConversations(data.data);
    };
    fetchData();
  }, []);

  const changeCurrentChat = (index, conversation) => {
    setCurrentSelected(index);
    setCurrentChat(conversation);
  };

  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 1000);

  // Fetch data when search user or messages
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${getUsersRoute}/?query=${filter}`);
      setSearchedUsers(res.data);
    }
    fetchData();
  }, [filter]);

  return (
    <>
      <Container className="h-screen w-1/3 min-w-[400px] ml-20 dark:bg-darkGunmetal rounded-tl-2xl rounded-bl-2xl bg-fogra29 border-r-2 border-gray-700">
        <div className="pt-4 px-4">
          <div className="grid grid-cols-2">
            <div className="flex gap-2 items-center justify-start">
              <p>Chưa đọc</p>
              <div className="bg-onyx flex items-center justify-center w-10 rounded-lg">
                <span>36</span>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-end">
              <p>Đã ghim</p>
              <div className="bg-onyx flex items-center justify-center w-10 rounded-lg">
                <span>12</span>
              </div>
            </div>
          </div>

          <div className="my-4 relative">
            <input
              type="text"
              className="w-full rounded-md dark:bg-charlestonGreen pl-8 py-2"
              placeholder="Tìm tên người dùng, tin nhắn..."
              onChange={handleInputFilter}
            />

            <IoSearch
              className="absolute left-2 top-2/4 -translate-y-2/4"
              fontSize={20}
            />
          </div>
        </div>

        {filter ? (
          <div>
            <SearchedUsers users={searchedUsers} />
            <div>
              <p className="bg-onyx px-4 py-2 text-sm">0 tin nhắn trùng khớp</p>
            </div>
          </div>
        ) : (
          <div className="contacts">
            {conversations &&
              conversations.length > 0 &&
              conversations.map((conversation, index) => (
                <div
                  key={conversation._id}
                  className={`min-h-[80px] w-[90%] p-2 flex cursor-pointer transition-all ${
                    index === currentSelected ? "bg-onyx rounded-lg" : ""
                  }`}
                  onClick={() => {
                    changeCurrentChat(index, conversation);
                  }}
                >
                  <ConversationItem
                    key={conversation._id}
                    conversation={conversation}
                    isSelected={index === currentSelected}
                  />
                </div>
              ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Contacts;

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 85%;
  overflow: hidden;

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
