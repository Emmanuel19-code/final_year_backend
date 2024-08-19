import appointment from "../database/models/Appointment.js";


export const ConsultantGetbookedappointment =async (req,res) =>{
    try {
      const doctor_Id = req.healthWorker.healthworkerId;
      if (!doctor_Id) {
        return res.status(400).json({
          msg: "please provide the details",
        });
      }
      const booked = await appointment
        .find({
          doctorId: doctor_Id,
        })
        
      if (!booked) {
        return res.status(400).json({
          msg: "There are no booked appointment for you at the moment",
        });
      }
      res.status(200).json({
        booked: booked,
      });
    } catch (error) {
       return res.status(400).json({
         msg:"an error occured please try again"
       })
    }
     
}