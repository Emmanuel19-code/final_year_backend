import conversation from "../database/models/conversation.js";
import user from "../database/models/user.js";

const getConversation = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const conversations = await conversation.find({
      participants: { $in: [user_id] },
    });
    
    const conversationUserdata = await Promise.all(
      conversations.map(async (conversation) => {
        const receiver_id = conversation.participants.find(
          (participant) => participant !== user_id
        );
        const user = await user.findById(receiver_id);
        return {
            user:{
                name:user.name,
                email:user.email,
                user_id: user.uniqueId
            },
            conversationId:conversation._id
        }
      })
    );

    res.status(200).json({ conversation: conversationUserdata });
  } catch (error) {
    res.status(400).json({
      msg: "An error occurred while trying to get your messages",
      error: error.message,
    });
  }
};

export default getConversation;
