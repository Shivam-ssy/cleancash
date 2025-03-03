import mongoose from "mongoose";

export const connectDB =async ()=>{
    const res=await mongoose.connect()
}