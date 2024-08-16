import HealthWorker from "../database/models/Healthworker.js";
import { StatusCodes } from "http-status-codes";
import { serverClient } from "../utils/streamconfig.js";

export const SignHealthworker = async(req,res) =>{
   const {email,password,healthworkerId} = req.body
   if(!email || !password || !healthworkerId){
    return res.status(400).json({
        msg:"please provide the missing information"
    })
   }
   const is_staff = await HealthWorker.findOne({
     email: email,
   });
   if(!is_staff){
    return res.status(400).json({
        msg:"this user is not registered as a staff"
    })
   }
   const confirm_pass = await is_staff.comparePassword(password);
   if(!confirm_pass){
     return res.status(400).json({
        msg:"please make sure the provider password is correct"
     })
   }
    const accesstoken = is_staff.createAccessToken();
    const refreshtoken = is_staff.createRefreshToken();
    const stream_token = serverClient.createToken(is_staff.healthworkerId);
     res.status(StatusCodes.OK).json({
       message: "Authentication Successful",
       userInfo: {
         uniqueId: is_staff.healthworkerId,
         profilePicture: is_staff.profilePicture,
         accesstoken: accesstoken,
         refreshtoken: refreshtoken,
         name: is_staff.name,
         email: is_staff.email,
         workingdays:is_staff.workingdays,
         phone:is_staff.phone,
         endTime:is_staff.endTime,
         startTime:is_staff.startTime,
         role:is_staff.role,
         about:is_staff.about,
         stream_token:stream_token
       },
     });
}