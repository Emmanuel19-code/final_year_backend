import appointment from "../database/models/Appointment.js";
import pusher from "../utils/pusherConfig.js";
import user from "../database/models/user.js";

export const createAppointment = async (req, res) => {
  try {
    const {
      appointment_date,
      appointment_time,
      appointment_type,
      consultant_id,
    } = req.body;
    const patient_id = req.user.uniqueId;

    if (
      !appointment_date ||
      !consultant_id ||
      !appointment_time ||
      !appointment_type
    ) {
      return res.status(400).json({
        msg: "Please provide the correct details",
      });
    }  
    const founduser = await user.findOne({ uniqueId : patient_id});
    if(!user){
       return res.status(404).json({
        msg:"user not found please create an account"
       })
    }
    const create = await appointment.create({
      appointmentDate: appointment_date,
      doctorId: consultant_id,
      patientId: patient_id,
      appointmentTime: appointment_time,
      appointmentType: appointment_type,
      patientName: founduser.name,
    });

    if (!create) {
      return res.status(400).json({
        msg: "Please try again",
      });
    }

    await pusher.trigger("appointments", consultant_id, {
      appointment: create,
    });

    res.status(200).json({
      msg: "Your appointment has been created",
      create
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(500).json({
      msg: "An error occurred while creating the appointment. Please try again.",
    });
  }
};
