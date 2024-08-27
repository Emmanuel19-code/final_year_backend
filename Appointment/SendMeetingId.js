import appointment from "../database/models/Appointment.js";
import pusher from "../utils/pusherConfig.js";


export const SendMeetingId = async (req, res) => {
  try {
    const { meetingId, patientId } = req.body;
    const { appointmentId } = req.params;
    if (!meetingId || !patientId) {
      return res.status(400).json({
        msg: "Please provide the meetingId and patientId",
      });
    }
    const findapp = await appointment.findOne({ _id: appointmentId });
    if (!findapp) {
      return res.status(400).json({
        msg: "couldn't find the appointment you want to start the meeting",
      });
    }
   findapp.callId = meetingId;
    await findapp.save()
    await pusher.trigger("meetingNotice", patientId, {
      appointment: findapp,
    });
    return res.status(200).json({
        msg:"Meeting Id sent",
        findapp
    })
  } catch (error) {
    return res.status(500).json({
        msg:"An error Occured whiles creating the meeting",
        error
    })
  }
};
