import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendOtp = asyncHandler(async (req, res) => {
  const { email, password, username, name } = req.body;

  if (!name || !username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  //email validation regex

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "Email already in use. Please login.");
  }

  const existingUsername = await User.findOne({
    username: username.toLowerCase(),
  });

  if (existingUsername) {
    throw new ApiError(400, "Username already in use. Please choose another.");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    );
  }

  await OTP.deleteMany({ email });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 3 * 60 * 1000),
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP",
    text: `Your OTP is ${otp}`,
  });

  return res.status(200).json(
    new ApiResponse(200, "OTP sent to email successfully", {
      success: true,
    }),
  );
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp, name, username, password } = req.body;

  const normalizedOtp = String(otp || "").trim();

  if (!/^\d{6}$/.test(normalizedOtp)) {
    throw new ApiError(400, "OTP must be a 6-digit number");
  }

  const otpRecord = await OTP.findOne({ email });

  if (!otpRecord) {
    throw new ApiError(400, "OTP not found. Please request a new one.");
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }

  const isValidOtp = await otpRecord.compareOtp(normalizedOtp);

  if (!isValidOtp) {
    throw new ApiError(400, "Invalid OTP. Please try again.");
  }

  const user = await User.create({
    name,
    username: username.toLowerCase(),
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, "User Signup failed. Please try again.");
  }

  await OTP.deleteMany({ email });

  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      userId: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    }),
  );
});

export { sendOtp, verifyOtp };
