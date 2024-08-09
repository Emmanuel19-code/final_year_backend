import notificaion from "../database/models/Notification.js";
import pusher from "../utils/pusherConfig.js";

export const SendNotifcationToUser = async (req, res) => {
  try {
    const { userId, title, message, data } = req.body;
    if (!userId || !title || !message) {
      return res.status(400).json({
        msg: "Please provide the missing fields",
      });
    }
    const randomColors = [
      "#D1C4E9",
      "#20B2AA",
      "#228B22",
      "#F5F5DC",
      "#FFFFE0",
    ];
    const getRandomColor = () => {
      const randomColors = [
        "#D1C4E9",
        "#20B2AA",
        "#228B22",
        "#B0B0B0",
        "#001F3F",
      ];
      return randomColors[Math.floor(Math.random() * randomColors.length)];
    };
    const backgroundColor = getRandomColor();
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
    await pusher.trigger(`${userId}`, "new-notification", {
      notification: create,
    });

    res.status(200).json({
      msg: "Notification has been sent",
      create
    });
  } catch (error) {
    return res.status(400).json({
      msg: "an error occured",
      error: error,
    });
  }
};
