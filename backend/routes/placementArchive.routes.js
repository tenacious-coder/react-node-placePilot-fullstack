import express from "express";
import multer from "multer";
import isAuth from "../middleware/isAuth.js";
import { isRecruiter } from "../middleware/isRecruiter.js";
import { createArchive, getArchive, deleteArchive } from "../controller/placementArchive.controller.js";

const archiveRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Create archive (Recruiter/Admin)
archiveRouter.post("/create", isAuth, isRecruiter, upload.single("document"), createArchive);

// Get archives (All authenticated users)
archiveRouter.get("/get", isAuth, getArchive);

// Delete archive (Recruiter, only own archives)
archiveRouter.delete("/:id", isAuth, deleteArchive );

export default archiveRouter;