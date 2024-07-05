import health_worker from "../database/models/Healthworker.js";


export const SignHealthworker = async(req,res) =>{
   const {email,password,healthworkerId} = req.body
   console.log("this is called",req.body);
   if(!email || !password || !healthworkerId){
    return res.status(400).json({
        msg:"please provide the missing information"
    })
   }
   const is_staff = await health_worker.findOne({
    email:email
   })
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
    //createcookies({ res, accesstoken, refreshtoken });
     res.status(StatusCodes.OK).json({
       message: "Authentication Successful",
       userInfo: {
         uniqueId: is_staff.healthworkerId,
         profilePicture: is_staff.profilePicture,
         accesstoken: accesstoken,
         refreshtoken: refreshtoken,
         name: is_staff.name,
         email: is_staff.email,
       },
     });
}