import { verify } from "argon2"
import { User } from "../models/user.model.js"
import { ApiError } from "../utility/ApiError.js"
import { ApiResponse } from "../utility/ApiResponse.js"
import {asyncHandler} from '../utility/asyncHandler.js'
import { sendOTP } from "../utility/sendOtp.js"
import otpGenerator from "otp-generator";
import OTP from "../models/otp.model.js"

const generateOTP = () => {
    return otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });
};

const options = {
   
    httpOnly:true,
    secure:true,
    maxAge:7200000,
    sameSite: 'None'
}

const generateAccessTokenRefreshToken= async (userId)=>{
    try {
        const user = await User.findById(userId)
        // console.log("user at generate tokens",user);
        
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken
        await user.save({ validateBeforeSave: false })
        return {refreshToken,accessToken}

    } catch (error) {
        console.log(error);
        
        throw new ApiError(500,"Something went wrong while generating the tokens")
    }
}
export const register = asyncHandler(async (req,res,next)=>{
    const {name,email,password}=req.body

    if (!name || !email || !password) {
        throw new ApiError(400,"Please Provide All Field")
    }
    const existingUser=await User.findOne({email})
    if (existingUser) {
        throw new ApiError(409,"User already existed")
    }
    
    const user = await User.create({
        name,
        email,
        password,
        role:"user"
    })
    const otp = generateOTP()
    await sendOTP(email,otp)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const cretedOtp=await OTP.create({
        otp,
        email:user.email,
        expiresAt 
    })
    if (!cretedOtp) {
        throw new ApiError(500, "Something went worong while generating the otp")
    }
    const createdUser = await User.findById(user._id).select("-password -reward -otpStatus")
    
    if (!createdUser) {
        throw new ApiError(500,"Error while creting the user")
    }

    return res.status(201)
                .json(new ApiResponse(201,createdUser,"User Created Successfully"))
})

export const verifyOtp = asyncHandler(async (req,res,next)=>{
    const {email,otp,date}=req.body
    if (!email || !otp) {
        throw new ApiError(404, "Not get the otp or user")
    }
    // const user = await User.findOne({email})
    // if (!user) {
    //     throw new ApiError(404, "User not found")
    // }
    // const validityDate =date?date:new Date()

    // if (!(validityDate - user.otpTimeStamp <=10)) {
    //     throw new ApiError(400,"otp is expired")
    // }
    // if (user.otp != otp) {
    //     throw new ApiError(400, "Otp Not Matched")
    // }
    const userOtp= await OTP.findOne({email})
    if (!userOtp) {
        throw new ApiError(404,"User with this email not found")
    }

    const newDate=date?date:new Date()
    if (!(newDate<=userOtp.expiresAt)) {
        throw new ApiError(400, "OTP has been expired")
    } 

    if (!(otp == userOtp.otp)) {
        throw new ApiError(400, "OTP not matched")
    }

    const user= await User.findOne({email})
    user.otpStatus= true
    user.isVarified=true
    user.save({validateBeforeSave:false})
    await OTP.deleteOne({email})
    return res.status(200).json(new ApiResponse(200,null, "opt vefified"))
})


export const generateOtp = asyncHandler(async (req,res,next)=>{
    const {email}=req.body

    if (!email) {
        throw new ApiError(404, "Please Provide an email")
    }
    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(404, "User not Found ")
    }
    const opt= generateOTP()
    const expiresAt= new Date(Date.now() + 10*60 * 1000)
    const userOtp = await OTP.create({
        otp,
        email,
        expiresAt
    })
    if (!userOtp) {
        throw new ApiError(500, "Something went wrong while creating the otp")
    }
    await sendOTP(email,opt)
    user.otpStatus=false

    user.save({validateBeforeSave:false})
    return res.status(200).json(new ApiResponse(200, null, "Opt generated successfully"))
})
// this is for the admins only 
export const createAnyUser = asyncHandler(async (req,res,next)=>{
    const {name,email,password,role}=req.body

    if (!name || !email || !password || !role) {
        throw new ApiError(400,"Please Provide All Field")
    }
    const existingUser=await User.findOne({email})
    if (existingUser) {
        throw new ApiError(409,"User already existed")
    }
    const user = await User.create({
        name,
        email,
        password,
        role:role
    })
    const createdUser = await User.findById(user._id).select("-password -reward")
    
    if (!createdUser) {
        throw new ApiError(500,"Error while creting the user")
    }

    return res.status(201)
                .json(new ApiResponse(201,createdUser,"User Created Successfully"))
})


export const login = asyncHandler(async (req,res,next)=>{
    const {email,password}=req.body

    if (!email || !password) {
        throw new ApiError(400,"Please Provide All Field")
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(404, "User Not Found")
    }
    
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Password is Incorrect")
    }
    const {refreshToken,accessToken}=await generateAccessTokenRefreshToken(user._id)    
    const logedInUser=await User.findById(user._id).select("-password -refreshToken -role -reward")

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,logedInUser,"User Login Successfully"))
})

export const updateUserName = asyncHandler(async (req,res,next)=>{
    const user=req.user
    const {name}=req.body
    if (!user) {
        throw new ApiError(400, "Access denied")
    }
    if(!name){
        throw new ApiError(404, "Not found any field to change ")
    }
    if (!user.isVarified) {
        throw new ApiError(404, "You are not varified")
    }
    const newUser= await User.findByIdAndUpdate(
        user._id,{
            $set:{
                name
            },
        },{
            new :true
        }
    )
    if (!newUser)
        throw new ApiError(500, "Something went wrong ")
    return res.status(200).json(new ApiResponse(200, null , "User updated successfully"))
})
export const logout= asyncHandler(async (req, res, next)=>{
    await Users.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: "" // this removes the field from document
            }
        },
        {
            new: true
        }
    )


    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})