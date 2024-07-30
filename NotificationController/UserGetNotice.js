import notificaion from "../database/models/Notification.js";

export const UserGetNotification = async (req, res) => {
  try {
    const userId = req.user.uniqueId;
    const all_notice = await notificaion.find({ userId: userId });
    if (!all_notice) {
      return res.status(404).json({
        msg: "You do not have any notification at the moment",
      });
    }
    res.status(200).json({
      all_notice,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "an error occured",
      error: error,
    });
  }
};
