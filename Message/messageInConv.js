import message from "../database/models/Messages.js";


export const MessageInConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        msg: "Conversation ID is required",
      });
    }
    const messages = await message.find({ conversationId: conversationId });
    if (messages.length === 0) {
      return res.status(404).json({
        msg: "There are no messages in this conversation",
      });
    }
    return res.status(200).json({
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "An error occurred while fetching messages",
      error: error.message,
    });
  }
};
