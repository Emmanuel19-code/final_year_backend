import { Trycatch } from "../middlewares/trycatch.js";
import healthworker from "../database/models/Healthworker.js";
import storeOTP from "../models/OtpSchema.js";
import { checkPassword } from "../utils/Checkpassword.js";
import { storeactivatetoken } from "../utils/cookieExpiration.js";
import { StatusCodes } from "http-status-codes";
import { emailValidation } from "../utils/emailvalidator.js";
import { sendOneTimePassword } from "../utils/MailNotification.js";
import hospital from "../database/models/Hospital.js";

export const registerHealthworkeraccount = Trycatch(async (req, res, next) => {
  const { name, email, password, healthWorkerId, oragnizationName } = req.body;
  if (!name || !email || !password || !healthWorkerId || !companyId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please Provide the missing detail",
    });
  }
  const valid = emailValidation(email);
  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide a valid email",
    });
  }
  const check = checkPassword(password);
  if (!check) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg1: "Password must have atleasts an uppercase letter",
      msg2: "Passord must have at least a lowercase letter",
      msg3: "Password must be a minimum of 8 characters",
      msg4: "Passowrd must have the following characters (?=.*[@$!%*#?&])",
    });
  }
  const isEmail = await healthworker.findOne({ email });
  if (isEmail) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "A user with this email exist",
    });
  }
 // const findcompany = await hospital.findOne({
 //   oragnizationName : oragnizationName,
 // });
 //const companyconfirm = findcompany.all_workers_id.filter(
 //  (id) => id === healthWorkerId
 //);
 //if (!companyconfirm){
 //    return res.status(StatusCodes.BAD_REQUEST).json({
 //       msg:"Kindly contact your Health Institution so you can be added as a health worker under this organization"
 //    })
 //}

  const userCreated = await healthworker.create(req.body);
  if (!userCreated) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create please try again",
    });
  }
 // if (companyconfirm){
 //     userCreated.isVerifiedByOrganization = true
 //     userCreated.save()
 // }
  const OTP = await userCreated.createActivationToken();
  const hashotp = await userCreated.HashOtp(OTP.activationcode);
  const createOTP = await storeOTP.create({
    owner: userCreated.uniqueId,
    otpvalue: hashotp.HashedOtp,
  });
  sendOneTimePassword({
    name: userCreated.name,
    email: userCreated.email,
    verificationToken: OTP.activationcode,
  });
  const activationtoken = OTP.activationtoken;
  storeactivatetoken({ res, activationtoken });
  console.log("user controller activationtoken", activationtoken);
  res.status(StatusCodes.CREATED).json({
    msg: "User created",
    otp: OTP.activationcode,
  });
});
