import express from "express"
import dotenv from "dotenv"
dotenv.config()
import authRoutes from "authRoutes.js"

const app=express()

const PORT=process.env.PORT || 5001

app.get("/",(req,res)=>{
    res.json({message:"Okay"})
})

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`)
})