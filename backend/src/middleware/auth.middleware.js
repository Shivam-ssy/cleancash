import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { asyncHandler } from "../utility/asyncHandler.js";

export const verifyJwt = asyncHandler(async (req,_,next)=>{

    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body.accessToken
    if (!token) {
        throw new ApiError(404, "Unathorized Access")
    }
    const decodedToken = jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user =await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(404,"Invalid Access Token")
    }
    req.user=user
    next()
})