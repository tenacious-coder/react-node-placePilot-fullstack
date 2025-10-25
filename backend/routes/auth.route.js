import express from "express"
import { login, logOut, signUp, updateProfile } from "../controller/auth.controller.js"
import isAuth from "../middleware/isAuth.js"
const authRouter = express.Router()
import { singleUpload } from "../middleware/multer.js"

authRouter.post("/signUp", singleUpload, signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logOut)
authRouter.post("/profile/update", isAuth, singleUpload, updateProfile);
export default authRouter;