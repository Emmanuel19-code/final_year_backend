import user from "../database/models/user.js";
import { StatusCodes } from "http-status-codes";


export const login =async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide the information",
    });
  }
  const isUser = await user.findOne({ email:email });
  if (!isUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "User is not found",
    });
  }
  if (isUser.isverified !== true) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please verify your account",
    });
  }
  const isMatch = await isUser.comparePassword(password);
  if (!isMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide the correct details",
    });
  }
  const accesstoken = isUser.createAccessToken();
  const refreshtoken = isUser.createRefreshToken();
 // createcookies({ res, accesstoken, refreshtoken });
  res.status(StatusCodes.OK).json({
    message: "Authentication Successful",
    userInfo: {
      uniqueId: isUser.uniqueId,
      profilePicture: isUser.profilePicture,
      accesstoken:accesstoken,
      refreshtoken:refreshtoken
    },
  });
};
