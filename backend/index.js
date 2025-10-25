import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
import trainingRouter from "./routes/training.route.js";
import archiveRouter from "./routes/placementArchive.routes.js";
import announcementRouter from "./routes/announcement.routes.js";

dotenv.config();
const app = express();

// ESM __dirname fix
 const _filename = fileURLToPath(import.meta.url);
 const _dirname = path.dirname(_filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "https://react-node-placepilot-fullstack.onrender.com", credentials: true }));
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
app.use("/api/training", trainingRouter);
app.use("/api/archives", archiveRouter);
app.use("/api/announcements", announcementRouter);

// Serve React frontend
 app.use(express.static(path.join(_dirname, "../frontend/placePilot/dist")));
 app.get('', (req, res) => {
  res.sendFile(path.resolve(_dirname, "../frontend/placePilot/dist/index.html"));
 });

// Connect to MongoDB and start server
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ DB connection error:", err));