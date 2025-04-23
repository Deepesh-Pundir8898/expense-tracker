import express from "express";
import cors from "cors";
import "dotenv/config"; // Ensure this is at the top
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import transectionRouter from "./routes/transection.route.js";
import path from "path";
import { fileURLToPath } from "url";

//  __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // Development origin
  "https://expense-tracker-1-9j3j.onrender.com", // Production origin
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you need to send cookies or authentication headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transections", transectionRouter);

// Serve static files (frontend build)
app.use(express.static(path.join(__dirname, "client/dist")));

// Fallback route for SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port: ${PORT}`);
});
