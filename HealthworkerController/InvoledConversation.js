import conversation from "../database/models/conversation.js";
import user from "../database/models/user.js";
import client from "../database/redis.js";

export const InvolvedConversation = async (req, res) => {
  try {
    const userId = req.health_Worker.healthworkerId;
      // If data is not in the cache, fetch it from the database
      const conversations = await conversation.find({ participants: userId });
      if (!conversations || conversations.length === 0) {
        return res.status(404).json({
          msg: "No conversations found for this user",
        });
      }
      const conversationUserData = await Promise.all(
        conversations.map(async (conversation) => {
          const notUser = conversation.participants.find((id) => id != userId);
          const consultant = await user.findOne({
            uniqueId: notUser,
          });
          if (consultant) {
            return {
              user: {
                name: consultant.name,
                uniqueId: consultant.uniqueId,
                phone: consultant.phone,
                email: consultant.email,
              },
              conversationId: conversation._id,
            };
          }
        })
      );
      return res.status(200).json({
        data: conversationUserData,
      });
    
  } catch (err) {
    console.error("Error fetching user conversations:", err);

    res.status(500).json({
      msg: "An error occurred while fetching conversations",
      error: err.message,
    });
  }

};

