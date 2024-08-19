import appointment from "../database/models/Appointment.js";
import pusher from "../utils/pusherConfig.js";

export const CompletedAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({
        msg: "An error occurred while trying to locate the appointment. Make sure it's available.",
      });
    }

    const findapp = await appointment.findById({_id:appointmentId});

    if (!findapp) {
      return res.status(400).json({
        msg: "This appointment is not available.",
      });
    }

    findapp.status = "completed";
    await findapp.save();

    await pusher.trigger("appointments", "completed-appointment", {
      appointment: findapp,
    });

    return res.status(200).json({
      msg: "Appointment has been completed",
      findapp
    });
  } catch (error) {
    return res.status(400).json({
      msg: "An error occurred.",
      error: error.message, // Include the error message
    });
  }
};
