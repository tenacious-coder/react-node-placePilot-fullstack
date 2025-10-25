import express from "express";
import multer from "multer";
import { isAuth } from "../middleware/isAuth.js";
import { isRecruiter } from "../middleware/isRecruiter.js";
import { createAnnouncement, getAnnouncement, deleteAnnouncement } from "../controller/announcement.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Create announcement (Recruiter/Admin)
router.post("/create", isAuth, isRecruiter, upload.single("document"), createAnnouncement);

// Get announcements (All authenticated users)
router.get("/get", isAuth, getAnnouncement);

// Delete announcement (Only creator)
router.delete("/:id", isAuth, deleteAnnouncement);

export default router;