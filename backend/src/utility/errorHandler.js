import { ApiError } from "./ApiError.js"

export const errorHandler= async (err,req,res, next)=>{
    console.log(err.stack)
    const statusCode= err.statusCode || 500
    const message = err.message || "Something went wrong"

    res.status(statusCode).json(new ApiError(statusCode,message))
}