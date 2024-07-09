import conversation from "../database/models/conversation.js";
import health_worker from "../database/models/Healthworker.js";

export const InvolvedConversation = async (req, res) => {
  try {
    const userId = req.user.uniqueId;
    const conversations = await conversation.find({ participants: userId });
    if (!conversations || conversations.length === 0) {
      return res.status(404).json({
        msg: "No conversations found for this user",
      });
    }
    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const notUser = conversation.participants.find((id) => id != userId);
        console.log(notUser);
        const consultant = await health_worker.findOne({
          healthworkerId: notUser,
        });
        if (consultant) {
          return {
            user: {
              name: consultant.name,
              healthworkerId: consultant.healthworkerId,
              phone: consultant.phone,
              email: consultant.email,
            },
            conversationId: conversation._id,
          };
        }
      })
    );
    res.status(200).json({
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


