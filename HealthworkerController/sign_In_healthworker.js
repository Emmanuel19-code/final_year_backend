import health_worker from "../database/models/Healthworker.js";


export const SignHealthworkder = async({req,res}) =>{
   const {email,password} = req.body
   if(!email || !password){
    return res.status(400).json({
        msg:"please provide the missing information"
    })
   }
   const is_staff = await health_worker.find({
    email:email
   })
   if(!is_staff){
    return res.status(400).json({
        msg:"this user is not registered as a staff"
    })
   }
   const confirm_pass = await health_worker.comparePassword(is_staff.password)
   if(!confirm_pass){
     return res.status(400).json({
        msg:"please make sure the provider password is correct"
     })
   }
    const accesstoken = is_staff.createAccessToken();
    const refreshtoken = is_staff.createRefreshToken();
    createcookies({ res, accesstoken, refreshtoken });
    res.status(StatusCodes.OK).json({
      message: "Authentication Successful",
    });
}