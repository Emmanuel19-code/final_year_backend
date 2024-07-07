import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

//export const Authentication = async (req, res, next) => {
//  const { accessToken, refreshToken } = req.signedCookies;
//  try {
//    if (!accessToken || !refreshToken) {
//      return res.json({
//        msg: "Please Login into your account",
//      });
//    }
//    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
//    req.user = {
//      uniqueId: payload.uniqueId,
//      username: payload.username,
//      role: payload.role,
//    };
//    next();
//  } catch (error) {
//    return res.status(StatusCodes.BAD_REQUEST).json({
//      msg: "An error occured while authenticating",
//    });
//  }
//};
//
//export const authorizePermision = (...roles) => {
//  return (req, res, next) => {
//    if (!roles.includes(req.user.role)) {
//      return res.status(StatusCodes.BAD_REQUEST).json({
//        msg: "You do not have permission to perform this action",
//      });
//    }
//    next();
//  };
//};

export const verifyuser = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer")) {
      return res.status(400).json({
        msg: "Please Sign In ",
      });
    }
    const token = authToken.split(" ")[1];
    console.log(token);
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { uniqueId: payload.uniqueId };
    next();
  } catch (error) {
    res.status(400).json({
      msg: "an error occured",
      error: error,
    });
  }
};

export const Verifyhealthworker = async (req, res, next) => {
   try {
     const authToken = req.headers.authorization;
     if (!authToken || !authToken.startsWith("Bearer")) {
       return res.status(400).json({
         msg: "Please Sign In ",
       });
     }
     const token = authToken.split(" ")[1];
     console.log(token);
     const payload = jwt.verify(token, process.env.TOKEN_SECRET);
     req.health_Worker = { healthworkerId: payload.healthworkerId };
     next();
   } catch (error) {
     res.status(400).json({
       msg: "an error occured",
       error: error,
     });
   }
};

export const Authentication = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer")) {
      return res.status(400).json({
        msg: "Please Sign In ",
      });
    }
    const token = authToken.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = { uniqueId: payload.uniqueId };
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.status(400).json({
        msg: "Please log into your account",
      });
    } else {
      res.status(400).json({
        msg: "an error occured",
        error: error,
      });
    }
  }
};


export const HealthworkerAuthetication = async (req,res,next)=>{
 try {
   const authToken = req.headers.authorization;
   if (!authToken || !authToken.startsWith("Bearer")) {
     return res.status(400).json({
       msg: "Please Sign In ",
     });
   }
   const token = authToken.split(" ")[1];
   const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
   req.health_Worker = { healthworkerId: payload.healthworkerId };
   next();
 } catch (error) {
   if (error.message == "jwt expired") {
     return res.status(400).json({
       msg: "Please log into your account",
     });
   } else {
     res.status(400).json({
       msg: "an error occured",
       error: error,
     });
   }
 }
}