//External Imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//Local Imports
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security Middleware
app.use(helmet());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));

// Request Parsing
app.use(express.json());
app.use(cookieParser());

// Request Logging
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("HRMS Backend Running...");
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});