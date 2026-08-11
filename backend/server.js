import express from "express"
import dotenv from "dotenv"
dotenv.config()
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./db/connectDB.js"
import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app=express()

const PORT=process.env.PORT || 5001

app.get("/",(req,res)=>{
    res.json({message:"Okay"})
})

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    connectDB ()
    console.log(`Server is running on PORT:${PORT}`)
})