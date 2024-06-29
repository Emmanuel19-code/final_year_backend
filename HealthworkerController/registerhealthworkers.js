import health_worker from "../database/models/Healthworker.js";
import storeOTP from "../database/models/Otp.js";
import { checkPassword } from "../utils/Checkpassword.js";
import { storeactivatetoken } from "../utils/cookieExpiration.js";
import { StatusCodes } from "http-status-codes";
import { emailValidation } from "../utils/emailvalidator.js";
import { sendOneTimePassword } from "../utils/MailNotification.js";
import all_workers from "../database/models/AllworkersId.js";

export const registerHealthworkeraccount = async (req, res) => {
  const { name, email, password, healthWorkerId } = req.body;
  console.log(req.body);
  console.log(name);

  if (!name || !email || !password || !healthWorkerId) {
    console.log(name, email, password, healthWorkerId);
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide the missing details",
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
  const isEmail = await health_worker.findOne({ email });
  if (isEmail) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "A user with this email exist",
    });
  }

  const allWorkersData = await all_workers.findOne();

  const confirmId = allWorkersData?.hospital_health_workers.some(
    (item) => item.healthWorkerId === healthWorkerId
  );
  if (!confirmId) {
    return res.status(400).json({
      msg: "Couldn't find your find Contact your administrator to solve this error",
    });
  }
  let userCreated = await health_worker.create(req.body);
  if (!userCreated) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create please try again",
    });
  }

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
};
