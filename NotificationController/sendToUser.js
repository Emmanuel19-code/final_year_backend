import notificaion from "../database/models/Notification.js";

export const SendNotifcationToUser = async (req, res) => {
  try {
    const { userId, title, message, data } = req.body;
    if (!userId || !title || !message) {
      return res.status(400).json({
        msg: "Please provide the missing fields",
      });
    }
    const create = await notificaion.create({
      userId,
      title,
      message,
      data,
    });
    if (!create) {
      return res.status(400).json({
        msg: "could not send please try again",
      });
    }
    res.status(200).json({
      msg: "Notification has been sent",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "an error occured",
      error: error,
    });
  }
};
