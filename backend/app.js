import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "*",
    caredentials: true,
}))

app.use(express.json())
app.use(cookieParser())

export {app}