import express from "express";

import isAuth from "../middleware/isAuth.js";
import {postJob, getAllJobs, getJobById, getAdminJobs } from "../controller/job.controller.js";

const jobRouter = express.Router();

jobRouter.post("/post", isAuth, postJob);
jobRouter.get("/get", isAuth, getAllJobs );
jobRouter.get("/get/:id", isAuth, getJobById);
jobRouter.get("/admin/jobs", isAuth, getAdminJobs);

export default jobRouter