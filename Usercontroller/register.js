import user from "../database/models/user.js";
import storeOTP from "../database/models/Otp.js";
import { checkPassword } from "../utils/Checkpassword.js";
import { StatusCodes } from "http-status-codes";
import { emailValidation } from "../utils/emailvalidator.js";
import { sendOneTimePassword } from "../utils/MailNotification.js";
import { serverClient } from "../utils/streamconfig.js";

export const registeraccount = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      console.log(name, email, password, phone);
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
    const isEmail = await user.findOne({ email });
    if (isEmail) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "A user with this email exist",
      });
    }
    const userCreated = await user.create(req.body);
    if (!userCreated) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Could not create please try again",
      });
    }

    const OTP = await userCreated.createActivationToken();
    const hashotp = await userCreated.HashOtp(OTP.activationcode);
    const createOTP = await storeOTP.create({
      owner: userCreated.uniqueId,
      otpvalue: hashotp,
    });
    sendOneTimePassword({
      name: userCreated.name,
      email: userCreated.email,
      verificationToken: OTP.activationcode,
    });
    let token = await userCreated.createToken();
    await serverClient.upsertUser({
      id: userCreated.uniqueId,
      name: userCreated.name,
      email: userCreated.email,
    });
    const stream_token = serverClient.createToken(userCreated.uniqueId)
    res.status(StatusCodes.CREATED).json({
      msg: "User created",
      otp: OTP.activationcode,
      token: token,
      stream_token:stream_token
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "An error occured while creating the account",
    });
  }
};
