import appointment from "../database/models/Appointment.js";


export const AllAppointments = async(req,res)=>{
  try {
     const all_appointments = await appointment.find()
     if(!all_appointments){
        return res.status(200).json({
            msg:"There are no appointments"
        })
     }
     res.status(200).json({
       all_appointments
     })
  } catch (error) {
    
  }
}