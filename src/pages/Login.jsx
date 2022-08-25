import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo.svg";

import { loginRoute } from "../utils/APIRoutes";

import Input from "../components/Input/Input";
import Authentication from "./Authentication";

const schema = yup.object({
  username: yup.string().required("Hãy nhập tên tài khoản"),
  password: yup.string().required("Hãy nhập mật khẩu"),
});

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleRegister = async (values) => {
    if (!isValid) return;
    try {
      const res = await axios.post(loginRoute, values);
      const user = res.data?.user;

      if (user) {
        toast.success("Đăng nhập thành công!");
        localStorage.setItem(
          import.meta.env.VITE_LOCAL_STORAGE_USER_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Show toast if errors happen
  useEffect(() => {
    const arrErrors = Object.values(errors);

    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  // Redirect to home page if user is logged in
  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <Authentication>
      <div className="flex uppercase gap-5 items-center mx-auto">
        <img src={logo} alt="logo" className="w-20" />
        <p className="text-5xl font-bold text-mediumPurple">Snappy</p>
      </div>

      <form
        className="flex flex-col gap-8"
        onSubmit={handleSubmit(handleRegister)}
      >
        <Input name="username" placeholder="Tên tài khoản" control={control} />

        <Input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          control={control}
        />

        <div className="have-account">
          Bạn chưa có tài khoản?{" "}
          <NavLink to={"/login"} className="underline text-mediumPurple">
            Đăng ký
          </NavLink>
        </div>

        <button type="submit" className="btn-primary">
          Đăng nhập
        </button>
      </form>
    </Authentication>
  );
};

export default Login;
