import { app } from "./src/app.js";
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js";

dotenv.config()

const port=process.env.port || 3000

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("Server is listing on port", port)
    })   
})