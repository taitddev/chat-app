import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";

import logo from "../assets/logo.svg";

import { registerRoute } from "../utils/APIRoutes";

import Input from "../components/Input/Input";
import Authentication from "./Authentication";

const schema = yup.object({
  fullname: yup
    .string()
    .required("Hãy nhập họ tên")
    .max(50, "Họ tên có tối đa 50 ký tự"),
  username: yup
    .string()
    .required("Hãy nhập tên tài khoản")
    .min(3, "Tài khoản phải có ít nhất 3 ký tự")
    .max(20, "Tài khoản có tối đa 20 ký tự"),
  email: yup
    .string()
    .email("Hãy nhập đúng định dạng email")
    .required("Hãy nhập email"),
  password: yup
    .string()
    .required("Hãy nhập mật khẩu")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Mật khẩu phải có ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 số và 1 ký tự đặc biệt"
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleRegister = async (values) => {
    if (!isValid) return;
    try {
      await axios.post(registerRoute, values);
    } catch (error) {
      console.log(error.message);
    }

    toast.success("Đăng ký tài khoản thành công!");
    navigate("/login");
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
        <Input name="fullname" placeholder="Họ tên" control={control} />

        <Input name="username" placeholder="Tên tài khoản" control={control} />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          control={control}
        />

        <Input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          control={control}
        />

        <Input
          name="passwordConfirm"
          type="password"
          placeholder="Xác nhận mật khẩu"
          control={control}
        />

        <div className="have-account">
          Bạn đã có tài khoản?{" "}
          <NavLink to={"/login"} className="underline text-mediumPurple">
            Đăng nhập
          </NavLink>
        </div>

        <button type="submit" className="btn-primary">
          Đăng ký
        </button>
      </form>
    </Authentication>
  );
};

export default Register;
