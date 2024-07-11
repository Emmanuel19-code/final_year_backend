import appointment from "../database/models/Appointment.js";
import client from "../database/redis.js";

export const GetAppointment = async (req, res) => {
  try {
    const user_id = req.user.uniqueId;
    const cacheKey = `appointments:${user_id}`;
    if (!client.isOpen) {
      await client.connect();
    }
    const cacheDated = await client.get(cacheKey);
    if (cacheDated) {
      return res.status(200).json({
        data: JSON.parse(cacheDated),
      });
    } else {
      const all_appointments = await appointment.find({ patientId: user_id });
      console.log(all_appointments);
      if (all_appointments.length == 0) {
        return res.status(200).json({
          msg: "you do not have any appointments at this moment",
        });
      }
      await client.setEx(cacheKey,86400,JSON.stringify(all_appointments));
      res.status(200).json({
        data: all_appointments,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "an error occured whiles fetching the data please try again",
    });
  }
};
