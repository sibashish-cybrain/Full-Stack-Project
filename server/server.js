// Load Environment Variables
const dotenv = require("dotenv");
dotenv.config();

//External Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

//Local Imports
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const passport = require("./config/passport");

// Validate Required Environment Variables
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// Configure Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Security Middleware

// Adds various HTTP security headers
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
// Allows frontend to communicate with backend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Logs every incoming request
app.use(morgan("dev"));

// Applies rate limiting
app.use(limiter);

// Request Parsing Middleware
app.use(express.json());
app.use(cookieParser());

// Serve uploaded images
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
// Session Configuration
// Required for Passport Authentication
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Application Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
    res.send("HRMS Backend Running...");
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});