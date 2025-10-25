import express from "express";
import isAuth from "../middleware/isAuth.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controller/application.controller.js";
 
const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", isAuth, applyJob);
applicationRouter.get("/get", isAuth, getAppliedJobs);
applicationRouter.get("/:id/applicants", isAuth, getApplicants);
applicationRouter.post("/status/:id/update", isAuth, updateStatus);

export default applicationRouter;
