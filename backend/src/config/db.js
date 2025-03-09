import mongoose from "mongoose";

export const connectDB =async ()=>{
    const res=await mongoose.connect(`${process.env.DB_URL}`).then(()=>{
        console.log("Database connected successfully");
    })
    .catch((error)=>{
        console.log(`Database Error`,error)
    })
}