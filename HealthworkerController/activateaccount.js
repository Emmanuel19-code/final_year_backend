import storeOTP from "../database/models/Otp.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import health_worker from "../database/models/Healthworker.js";

export const ActivateAccount = async (req, res) => {
  try {
     const { activationcode } = req.body;
     const userId = req.health_Worker.healthworkerId;
     if (!userId) {
       return res.status(StatusCodes.BAD_REQUEST).json({
         msg: "Please this user does not exist",
       });
     }
     if (activationcode.length !== 4) {
       return res.status(StatusCodes.BAD_REQUEST).json({
         msg: "token length must be 4",
       });
     }
     const isUser = await storeOTP.findOne({ owner: userId });
     if (!isUser) {
       return res.status(StatusCodes.BAD_REQUEST).json({
         msg: "Please Request a new OTP",
       });
     }
     const payload = jwt.verify(isUser.otpvalue, process.env.HASH_PASSWORD);
     if (activationcode !== payload.otpvalue) {
       return res.status(400).json({
         msg: "please provide the right OTP value",
       });
     }
     const unverifieduser = await health_worker.findOne({
       healthworkerId: userId,
     });
     unverifieduser.isverified = true;
     unverifieduser.save();
     const delotp = await storeOTP.deleteOne({ owner: userId });
     //res.clearCookie("authcookie");
     res.status(StatusCodes.OK).json({
       msg: "You have been verified successfully",
     });
  } catch (error) {
    return res.status(400).json({
      msg:"an error occured please try again"
    })
  }
 
};
