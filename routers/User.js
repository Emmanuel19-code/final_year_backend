import express from "express";
import { login } from "../Usercontroller/loginaccount.js";
import { registeraccount } from "../Usercontroller/register.js";
import { updateUserInfo } from "../Usercontroller/updateaccountdetails.js";
import Authenticate from "../middlewares/authentication.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registeraccount);
router.post("/accountdetailsupdate",Authenticate ,updateUserInfo);



export default router