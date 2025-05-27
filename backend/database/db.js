import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    //    {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log(
      `MongoDB Connected Successfully! ${conn.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;
