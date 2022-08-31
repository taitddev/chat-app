import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

// context
import { useAuth } from "../context/AuthContext";

// icon
import { FaFire, FaPoo } from "react-icons/fa";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { logoutRoute } from "../utils/APIRoutes";
import logo from "../assets/logo.svg";
import ToggleTheme from "./Toggle/ToggleTheme";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("test");
    const data = await axios.get(`${logoutRoute}/${user._id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-20 flex flex-col bg-white dark:bg-onyx shadow-lg z-10">
      <NavLink to="/">
        <img
          src={logo}
          alt="logo"
          className="w-12 mx-auto py-4 cursor-pointer"
        />
      </NavLink>

      <SideBarIcon
        icon={<IoPersonOutline size="22" />}
        onClick={handleLogout}
      />

      <div className="absolute bottom-6 left-2/2 translate-x-2/4 ">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Sidebar;

const SideBarIcon = ({ icon, text = "tooltip 💡", onClick = () => {} }) => (
  <div
    className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto bg-gray-300 hover:bg-crayola dark:hover:bg-mediumPurple dark:bg-gray-800 text-white dark:text-white hover:text-white dark:hover:text-white hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg group"
    onClick={onClick}
  >
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);
