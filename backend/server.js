import express from "express";
import colors from "colors";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./database/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
import path from "path";

// database
connectDB();

const __dirname = path.resolve()

// rest object
const app = express();

// middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/products', productRoutes);

// production static files
app.use(express.static(path.join(__dirname, './frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Vercel!' });
});

// server start
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running Successfully on port ${PORT}`.bgMagenta.white);
});

module.exports = app;