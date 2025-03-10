import dotenv from "dotenv";
dotenv.config()
import cors from 'cors';
import express from "express";
import userRouter from './routes/user.routes.js'
import reportRouter from './routes/report.routes.js'
import { errorHandler } from "./utility/errorHandler.js";
import cookieParser from 'cookie-parser'

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
}));



app.use('/api/v1/users',userRouter)
app.use('/api/v1/report',reportRouter)

app.get('/',(req,res)=>{
    res.status(200).json({status:200,data:null,message:"Welcome to the API of CleanCash"})
})

app.all('*',(req,res)=>{
    res.status(404).json({status:404,data:null,message:"Route not found"})
})
//To handle all server error
app.use(errorHandler)

export {app}