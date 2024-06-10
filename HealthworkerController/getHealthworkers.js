import healthworker from "../database/models/Healthworker";


export const getAllHealthworkers = async (req,res) =>{
   const allworkers = await healthworker.find()
   if(!allworkers){
    return res.status(400).json({
        msg:"No health worker available"
    })
   }
   res.status(200).json({
    msg:allworkers
   })
}