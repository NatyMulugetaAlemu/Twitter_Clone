import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected Successfully:${conn.connection.host}`)
    } catch (error) {
        console.log(`Error Connecting toMongoDB:${error.message}`)
    }
}

export default connectDB
