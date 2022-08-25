import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const setProfilePicture = async () => {
    if (!selectedAvatar) {
      toast.error("Hãy chọn ảnh đại diện");
    } else {
      const user = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_USER_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          import.meta.env.VITE_LOCAL_STORAGE_USER_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Lỗi khi đặt hình đại diện. Vui lòng thử lại.");
      }
    }
  };

  // Get random avatar from API
  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 16; i++) {
        const image = await axios.get(
          `${api}/${Math.floor(Math.random() * 1000000)}?apikey=zHfyweGUOANuab`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
          <img src={loader} alt="loader" className="w-32" />
        </div>
      ) : (
        <div className="flex flex-col h-screen w-screen items-center justify-center gap-12">
          <h2>Chọn ảnh đại diện</h2>

          <div className="grid grid-cols-4 gap-8">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`border-2 border-transparent p-1 rounded-full flex items-center justify-center transition-all ${
                    selectedAvatar === index ? "border-hanPurple" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                    className="w-20 cursor-pointer transition-all"
                  />
                </div>
              );
            })}
          </div>

          <button onClick={setProfilePicture} className="btn-primary">
            Đặt làm ảnh đại diện
          </button>
        </div>
      )}
    </>
  );
}
