import mongoose from "mongoose";
import colors from "colors";
import "dotenv/config";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected Successfully! ${conn.connection.host}`.bgGreen)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed.white)
    }
}

export default connectDB
