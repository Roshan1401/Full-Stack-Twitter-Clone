import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../../Redux/auth/authSlice.js";
import { useApi } from "../../../hooks/useApi.js";
import AuthFormLayout from "../AuthFormLayout.jsx";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useApi();

  const submit = async (data) => {
    console.log(data);
    const signupData = await request("POST", "/auth/signup", data);

    if (!signupData) {
      alert("Signup failed");
      return;
    }

    console.log("Signup success");

    const loginData = await request("POST", "/auth/login", data);

    if (loginData) {
      dispatch(authLogin({ userInfo: loginData.user }));
      navigate("/");
    }
  };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter Your Name",
      validation: {
        required: "Name is required",
      },
    },
    {
      name: "username",
      type: "text",
      placeholder: "Enter username",
      validation: {
        required: "username is required",
      },
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Email address must be a valid address",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
      validation: {
        required: "Password is required",
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must be 8+ chars, include uppercase, lowercase, number & special character",
        },
      },
    },
  ];

  return (
    <AuthFormLayout
      title="Sign Up"
      fields={fields}
      onSubmit={submit}
      buttonText="Sign UP"
      bottomLinkUrl="/login"
      bottomLinkText="Log In"
      bottomDescription="Already have an account?"
      containerClass="signup-Container"
    />
  );
}

export default SignUp;
