import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowerCase:true
    },
    passsword:{
        type:String,
        required:true,
    },
    reward:{
        type:Number,
        default:0,
    }
},{timestamp:true})

export const User=mongoose.model('User',userSchema)