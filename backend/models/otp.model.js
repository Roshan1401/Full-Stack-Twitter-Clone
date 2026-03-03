import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { timestamps: true },
);

otpSchema.pre("save", async function () {
  if (!this.isModified("otp")) {
    return;
  }

  this.otp = await bcrypt.hash(this.otp, 10);
});

otpSchema.methods.compareOtp = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};

export const OTP = mongoose.model("OTP", otpSchema);
