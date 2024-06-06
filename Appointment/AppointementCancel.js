import appointment from "../database/models/Appointment.js";


export const cancelappointment = async(req,res) =>{
  const {appointment_id} = req.body
  if(!appointment_id){
    return res.status(400).json({
        msg:"an error occured while trying to locate the appointment make sure it's available"
    })
  }
  const findapp = await appointment.findOne({ appointmentId:appointment_id});
  if (!findapp){
     return res.status(400).json({
        msg:"This appointment is not available"
     })
  }
  findapp.status="canceled"
  findapp.save()
  res.status(200).json({
    msg:"Appointment has been canceled successfully"
  })
}