import appointment from "../database/models/Appointment.js";

export const appointmentReschedule = async (req,res) =>{
    const {newappointmentdate,appointment_id,newappointment_time} = req.body
    if(!appointment_id || !newappointmentdate || !newappointment_time){
        return res.status(400).json({
            msg:"please provide the right information"
        })
    }
    
    const filter = { appointmentId: appointment_id }; // The filter to find the document
    const updateDoc = {
      $set: {
        appointmentDate: newappointmentdate, // The fields to update
        appointmentTime: newappointment_time,
      },
    };
    const result = await appointment.findOneAndUpdate(filter, updateDoc)
    if(!result){
        return res.status(400).json({
            msg:"please try again"
        })
    }
    res.status(200).json({
        msg:"successfully updated"
    })
}