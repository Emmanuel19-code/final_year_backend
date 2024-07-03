import express from "express";
import { login } from "../Usercontroller/loginaccount.js";
import { registeraccount } from "../Usercontroller/register.js";
import { updateUserInfo } from "../Usercontroller/updateaccountdetails.js";
import { verifyuser, Authentication } from "../middlewares/authentication.js";
import { activateAccount } from "../Usercontroller/activateaccount.js";
import { ForgotPassword } from "../Usercontroller/Forgotpassword.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registeraccount);
router.post("/accountdetailsupdate", Authentication, updateUserInfo);
router.post("/verifying_account",verifyuser,activateAccount)
router.post("/forgot_password",Authentication,ForgotPassword)



export default router