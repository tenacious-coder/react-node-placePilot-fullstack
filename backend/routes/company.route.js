import express from "express";

import isAuth from "../middleware/isAuth.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controller/company.controller.js";
import { singleUpload } from "../middleware/multer.js";

const companyRouter = express.Router();

companyRouter.post("/register", isAuth, registerCompany);
companyRouter.get("/get", isAuth, getCompany);
companyRouter.get("/get/:id", isAuth, getCompanyById);
companyRouter.put("/update/:id", isAuth, singleUpload, updateCompany);

export default companyRouter