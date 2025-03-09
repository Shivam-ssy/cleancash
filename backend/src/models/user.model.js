import mongoose from "mongoose";
import argon2 from "argon2";
import Jwt from 'jsonwebtoken'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    address: {
        city: { 
          type: String, 
        },
        state: { 
          type: String, 
        },
        locality: { 
          type: String, 
        }
      },
    otpStatus:{
        type:Boolean,
        default:false
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    role: { 
        type: String, 
        enum: ['user', 'officer','admin'], 
        default: 'user' 
    },
    reward:{
        type:Number,
        default:0,
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(! this.isModified("password")) return next()
    try {
        
        this.password= await argon2.hash(this.password)
        next()
    } catch (error) {
        next(error)
    }
})
userSchema.methods.isPasswordCorrect=async function(password){
    return await argon2.verify(this.password,password)
}
userSchema.methods.generateAccessToken=function (){
    return Jwt.sign({
            _id:this._id,
            name:this.name,
            email:this.email
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRE
        }
    )

}
userSchema.methods.generateRefreshToken=function (){
     return Jwt.sign({
            _id:this._id
        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}
export const User=mongoose.model('User',userSchema)