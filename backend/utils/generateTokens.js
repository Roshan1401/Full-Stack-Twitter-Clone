import jwt from "jsonwebtoken"
import { User } from "../models/user.model"
import { ConnectionStates } from "mongoose"

const generateTokens = (email) => {

    const user = User.find((user) => user.email === email)

    if (!user) {
        throw Error
    }

    const accessToken = jwt.sign(
        {
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    const refreshToken = jwt.sign(
        {
            email: user.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )

    user.refreshToken = refreshToken

    return {accessToken,refreshToken}
}
