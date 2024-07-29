import appointment from "../database/models/Appointment.js"


export const createAppointment =async (req,res,io) =>{
   const { appointment_date, appointment_time, appointment_type,consultant_id} = req.body;
   const patient_id = req.user.uniqueId
  if(!appointment_date || !consultant_id || !appointment_time || !appointment_type){
    return res.status(400).json({
        msg:"please provide the correct details"
    })
  }
  const create = await appointment.create({
    appointmentDate: appointment_date,
    doctorId: consultant_id,
    patientId: patient_id,
    appointmentTime: appointment_time,
    appointmentDate:appointment_date,
    appointmentType:appointment_type
  });
  if(!create){
     return res.status(400).json({
        msg:"please try again"
     })
  }
  io.emit("newppointment",create)
  res.status(200).json({
    msg:"you appointment has been created"
  })
}