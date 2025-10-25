import express from "express";
import isAuth from "../middleware/isAuth.js";
import { isRecruiter } from "../middleware/isRecruiter.js";
import multer from "multer";
import { createTraining, getAllTraining, getTrainingById } from "../controller/training.controller.js";

const trainingRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Admin/Recruiter route
trainingRouter.post("/create", isAuth, isRecruiter, upload.single("document"), createTraining);

// Students route
trainingRouter.get("/get", isAuth, getAllTraining);
trainingRouter.get("/get/:id", isAuth, getTrainingById);

export default trainingRouter;