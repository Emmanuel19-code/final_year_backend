import HealthWorker from "../database/models/Healthworker.js";
import storeOTP from "../database/models/Otp.js";
import { checkPassword } from "../utils/Checkpassword.js";
import { StatusCodes } from "http-status-codes";
import { emailValidation } from "../utils/emailvalidator.js";
import { sendOneTimePassword } from "../utils/MailNotification.js";
import allWorkers from "../database/models/AllworkersId.js";
import { serverClient } from "../utils/streamconfig.js";

export const registerHealthworkeraccount = async (req, res) => {
  try {
    const { name, email, password, healthworkerId, phone } = req.body;
    if (!name || !email || !password || !healthworkerId || !phone) {
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
       msg: [
         "Password must have at least an uppercase letter",
         "Password must have at least a lowercase letter",
         "Password must be a minimum of 8 characters",
         "Password must include at least one special character (?=.*[@$!%*#?&])",
       ],
     });
   }

    const isEmail = await HealthWorker.findOne({ email });
    if (isEmail) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "A user with this email exist",
      });
    }
    const confirmId = await allWorkers.findOne({
      healthworkerId: healthworkerId,
    });
    if (!confirmId) {
      return res.status(400).json({
        msg: "Couldn't confirm your identity Contact your administrator to solve this problem",
      });
    }
    let userCreated = await HealthWorker.create(req.body);
    if (!userCreated) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Could not create please try again",
      });
    }
    userCreated.isVerifiedByOrganization = true;
    userCreated.save();
    const OTP = await userCreated.createActivationToken();
    const hashotp = await userCreated.HashOtp(OTP.activationcode);
    const createOTP = await storeOTP.create({
      owner: userCreated.healthworkerId,
      otpvalue: hashotp.HashedOtp,
    });
    sendOneTimePassword({
      name: userCreated.name,
      email: userCreated.email,
      verificationToken: OTP.activationcode,
    });
    await serverClient.upsertUser({
      id: userCreated.healthworkerId,
      name: userCreated.name,
      email: userCreated.email,
    });
    const stream_token = serverClient.createToken(userCreated.healthworkerId);
    let token = await userCreated.createToken();
    res.status(StatusCodes.CREATED).json({
      msg: "User created",
      otp: OTP.activationcode,
      token: token,
      stream_token: stream_token,
    });
  } catch (error) {
    return res.status(500).json({
      errorMsg: "An error occured",
      error: error,
    });
  }
};
