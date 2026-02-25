import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../../Redux/auth/authSlice.js";
import { useApi } from "../../../hooks/useApi.js";
import AuthFormLayout from "../AuthFormLayout.jsx";

function Login() {
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

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Email must be a valid address",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
      validation: {
        required: "Password is required",
      },
    },
  ];

  return (
    <AuthFormLayout
      title="Log In"
      fields={fields}
      onSubmit={submit}
      buttonText="Log In"
      bottomLinkUrl="/signup"
      bottomLinkText="Sign Up"
      bottomDescription="Create an account?"
      containerClass="login-Container"
    />
  );
}

export default Login;
