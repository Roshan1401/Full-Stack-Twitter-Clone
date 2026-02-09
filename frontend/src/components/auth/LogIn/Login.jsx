import React from "react";
import logo from "../../../assets/logo3.png";
import Input from "../../Input/Input";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.success) {
      navigate("/");
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
