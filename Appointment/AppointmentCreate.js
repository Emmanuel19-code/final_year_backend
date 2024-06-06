import appointment from "../database/models/Appointment.js"


export const createAppointment =async (req,res) =>{
  const {appointmentDate,doctorId,patientId,appointmentTime} = req.body
  if(!appointmentDate || !doctorId|| !patientId || !appointmentTime){
    return res.status(400).json({
        msg:"please provide the correct details"
    })
  }
  const create = await appointment.create({
    appointmentDate:appointmentDate,
    doctorId:doctorId,
    patientId:patientId,
    appointmentTime:appointmentTime
  })
  if(!create){
     return res.status(400).json({
        msg:"please try again"
     })
  }
  res.status(200).json({
    msg:"you appointment has been created"
  })
}