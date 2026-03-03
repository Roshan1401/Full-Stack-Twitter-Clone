import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controller.js";

const router = Router();

router.route("/send").post(sendOtp);
router.route("/verify").post(verifyOtp);

export default router;
