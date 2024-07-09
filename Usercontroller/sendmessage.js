import message from "../database/models/Messages.js";


const SendMessage = async (req, res, io) => {
  try {
    const { conversationId, content } = req.body;
    const newMessage = await message.create({
      conversationId: conversationId,
      content: content,
      sender: req.user.uniqueId,
    });
    if (!newMessage) {
      return res.status(400).json({
        message: "message not sent",
      });
    }
    io.to(conversationId).emit("newMessage", newMessage);
    res.status(200).json({
      msg: "message successfully sent",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "An error occurred while trying to send the message",
    });
  }
};

export default SendMessage