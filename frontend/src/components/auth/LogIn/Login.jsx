import React from "react";
import logo from "../../../assets/logo3.png";
import Input from "../../Input/Input";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../../Redux/auth/authSlice.js";
import { useApi } from "../../../hooks/useApi.js";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useApi();

  const submit = async (data) => {
    const responseData = await request("POST", "/auth/login", data);

    if (responseData) {
      dispatch(authLogin({ userInfo: responseData.user }));
      navigate("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="login-Container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(submit)}>
          <h2>Log In</h2>
          <Input
            placeholder="Enter Your Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email must be a valid address",
              },
            })}
          />
          <Input
            type="password"
            placeholder="Enter Your Password"
            {...register("password", {
              required: true,
            })}
          />
          <button type="submit">Log In</button>
        </form>
        <p className="gap-0.5 text-white">
          Create an account?&nbsp;
          <Link
            to="/signup"
            className="underline underline-offset-3 hover:text-[#1d4ed8]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
