import conversation from "../database/models/conversation.js";
import health_worker from "../database/models/Healthworker.js";
import client from "../database/redis.js";

export const InvolvedConversation = async (req, res) => {
  try {
    const userId = req.user.uniqueId;
    const cacheKey = `conversations:${userId}`;
    // Ensure Redis client is connected
    if (!client.isOpen) {
      await client.connect();
    }
    // Check if the data is in the cache
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      // If data is found in the cache, return it
      return res.status(200).json({
        data: JSON.parse(cachedData),
      });
    } else {
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
          const consultant = await health_worker.find({
            healthworkerId: notUser,
          });

          return {
            user: {
              name: consultant.name,
              healthworkerId: consultant.healthworkerId,
              phone: consultant.phone,
              email: consultant.email,
            },
            conversationId: conversation._id,
          };
        })
      );
      await client.setEx(cacheKey, 1800, JSON.stringify(conversationUserData)); //holding data for a day
      return res.status(200).json({
        data: conversationUserData,
      });
    }
  } catch (err) {
    console.error("Error fetching user conversations:", err);

    res.status(500).json({
      msg: "An error occurred while fetching conversations",
      error: err.message,
    });
  }
};
