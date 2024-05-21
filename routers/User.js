import express from "express";
import { login } from "../Usercontroller/loginaccount.js";
import { registeraccount } from "../Usercontroller/register.js";
import { updateUserInfo } from "../Usercontroller/updateaccountdetails.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registeraccount);
router.post("/accountdetailsupdate", updateUserInfo);



export default router