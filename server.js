import express from "express";
import colors from "colors";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./database/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors"
import path from "path"

// database
connectDB();

// rest object
const app = express();

const __dirname =path.resolve()

// middleware
app.use(cors)
app.use(express.json());
app.use(morgan("dev"));

// Connected to Frontend
app.use('/', express.static(path.join(__dirname, 'frontend')))

// routes
app.use('/api/v1/auth', authRoute)

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the E-Commerce Website</h1>");
});

// port
const PORT = process.env.PORT || 5050;

// run listen
app.listen(PORT, () => {
  console.log(`Server is running Successfully on port ${PORT}`.bgMagenta.white);
});
