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


//To handle all server error
app.use(errorHandler)

export {app}