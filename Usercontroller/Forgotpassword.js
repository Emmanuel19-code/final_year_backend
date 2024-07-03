import user from "../database/models/user.js";
import { StatusCodes } from "http-status-codes";

export const ForgotPassword = async (req, res) => {
  const { userInfo } = req.body;
  if (!userInfo) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "field cannot be empty",
    });
  }
  const isUser = await user.findOne({ email: userInfo });
  if (!isUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "User not found",
    });
  }
  let token = await isUser.createToken();
  res.status(StatusCodes.OK).json({
    msg: "ohk",
    token: token,
  });
};
