import express from "express";
import colors from "colors";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./database/db.js";
import authRoute from "./routes/authRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import cors from "cors"

// database
connectDB();

// rest object
const app = express();

// middleware
// app.use(cors)
app.use(express.json());
app.use(morgan("dev"));

// Server Static Files from React
// app.use('/', express.static(path.join(path.resolve(), 'frontend/dist/index.html')))

// Connecting frontend to backend
// Enable CORS properly
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

// endpoint or routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)

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
