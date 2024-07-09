import express from "express";
import { login } from "../Usercontroller/loginaccount.js";
import { registeraccount } from "../Usercontroller/register.js";
import { updateUserInfo } from "../Usercontroller/updateaccountdetails.js";
import { verifyuser, Authentication } from "../middlewares/authentication.js";
import { activateAccount } from "../Usercontroller/activateaccount.js";
import { ForgotPassword } from "../Usercontroller/Forgotpassword.js";
import { DeleteUser } from "../Usercontroller/DeleteUser.js";
import { GetAppointment } from "../Appointment/GetAppointment.js";
import { Userprofile } from "../Usercontroller/profileInfo.js";
import getConversation from "../Conversationcontroller/getconversation.js";
import { InvolvedConversation } from "../Conversationcontroller/InvoledConversation.js";


const router = express.Router();

router.post("/login", login);
router.post("/register", registeraccount);
router.post("/accountdetailsupdate", Authentication, updateUserInfo);
router.post("/verifying_account",verifyuser,activateAccount)
router.post("/forgot_password",Authentication,ForgotPassword)
router.get("/deleteuser",DeleteUser)
router.get("/all_appointments",Authentication,GetAppointment)
router.get("/profile",Authentication,Userprofile)
router.get("/get_conversation",Authentication,InvolvedConversation)


export default router