import React from "react";
import Container from "../../../container/container";
import logo from "../../../assets/logo3.png";
import Input from "../../Input/Input";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submit = async (data) => {
    console.log(data);
    const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (responseData.success) {
      console.log("Signup success");
      const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (responseData.success) {
        navigate("/");
      }
    } else {
    }
  };
  return (
    <div className="signup-Container">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(submit)}>
          <h2>Sign Up</h2>

          <Input
            placeholder="Enter Your Name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <p className="mt mb-2 text-sm text-[#ff4d4f]">
              {errors.name.message}
            </p>
          )}
          <Input
            placeholder="Enter username"
            {...register("username", {
              required: "username is required",
            })}
          />
          {errors.username && (
            <p className="mt mb-2 text-sm text-[#ff4d4f]">
              {errors.username.message}
            </p>
          )}
          <Input
            placeholder="Enter Your Email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          {errors.email && (
            <p className="m mb-2 text-sm text-[#ff4d4f]">
              {errors.email.message}
            </p>
          )}

          <Input
            placeholder="Enter Your Password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be 8+ chars, include uppercase, lowercase, number & special character",
              },
            })}
          />
          {errors.password && (
            <p className="mt mb-2 text-sm text-[#ff4d4f]">
              {errors.password.message}
            </p>
          )}
          <button type="submit">Sign UP</button>
        </form>
        <p className="text-white">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="underline underline-offset-3 hover:text-[#1d4ed8]"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
