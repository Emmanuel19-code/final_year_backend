import notificaion from "../database/models/Notification.js";

export const NotificationToRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const userId = req.user.uniqueId;
    if (!notificationId) {
      return res.status(400).json({
        msg: "Please provide notificationId",
      });
    }
    const notice = await notificaion.find({ _id: notificationId });

    notice[0].read = true;
    await notice[0].save();

    return res.status(200).json({
      msg: "read",
      notice,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "an error occured",
      error: error,
    });
  }
};
