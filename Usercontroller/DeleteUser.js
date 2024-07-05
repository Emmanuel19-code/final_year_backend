import user from "../database/models/user.js";


export const DeleteUser = async(req,res)=>{
    try {
         const result = await user.deleteMany();
         if (!result) {
           return res.status(400).json({
             msg: "Please couldn't delete",
           });
         }
         res.status(200).json({
           msg: "Delete successfull",
         });
    } catch (error) {
        return res.status(400).json({
            msg:"an error occured",
            error:error
        })
    }
  
}