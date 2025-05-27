import express from "express";
import colors from "colors";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./database/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
// import path from "path";

// database
connectDB();

// rest object
const app = express();
app.use(cors());
app.use(express.json());

// middleware
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

// app.options('*', cors());

app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoutes);

// production static files
// app.use(express.static(path.join(path.resolve(), './frontend/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

app.get('/', (req, res) => {
  res.send('Backend is running on Railway!' );
});

// app.use("/", (req, res, next) => {
//   console.log("Request URL:", req.url, "method: ", req.method, 'Welcome server!');
//   next();
// });

// server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running Successfully on port ${PORT}`.bgMagenta.white);
});

export default app;
