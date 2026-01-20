import jwt from "jsonwebtoken"
import { User } from "../models/user.model"
import ApiError from "./ApiError.js"

const generateTokens = async (userId) => {

    const user = User.findById(userId)

    if (!user) {
        throw new ApiError(404, "User not found while generating tokens")
    }

    const accessToken = jwt.sign(
        {
            _id: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    const refreshToken = jwt.sign(
        {
            _id: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave: false})
    return { accessToken, refreshToken }
}

export { generateTokens }