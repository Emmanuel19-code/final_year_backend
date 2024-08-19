import appointment from "../database/models/Appointment.js";
import pusher from "../utils/pusherConfig.js";

export const Cancelappointment = async (req, res) => {
  try {
    const { appointment_id } = req.body;

    if (!appointment_id) {
      return res.status(400).json({
        msg: "An error occurred while trying to locate the appointment. Make sure it's available.",
      });
    }

    const findapp = await appointment.findById(appointment_id);

    if (!findapp) {
      return res.status(400).json({
        msg: "This appointment is not available.",
      });
    }

    findapp.status = "canceled";
    await findapp.save();

    await pusher.trigger("appointments", "canceled-appointment", {
      appointment: findapp,
    });

    return res.status(200).json({
      msg: "Appointment has been canceled successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "An error occurred.",
      error: error.message, // Include the error message
    });
  }
};
