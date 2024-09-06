import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";


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
     console.log(payload);
     
     req.healthWorker = { healthworkerId: payload.healthworkerId };
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

export const AdminAuthorization = (req, res, next) => {
  if (req.healthWorker.role !== "admin") {
    return res.status(403).json({
      msg: "Access denied. Admins only.",
    });
  }
  next();
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
   req.healthWorker = { healthworkerId: payload.healthworkerId,role:payload.role };
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