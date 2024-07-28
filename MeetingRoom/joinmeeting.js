import io from "../server";

export const JoinMeeting = async (req, res) => {
  const { name, meetingId } = req.body;

  if (!name || !meetingId) {
    return res.status(400).json({
      msg: "Please provide the correct room details",
    });
  }

  io.emit("joinConversation", {
    conversationId: meetingId,
    name,
    userIdentity: "someUserIdentity",
  });

  res.status(200).json({
    msg: "Joined meeting successfully",
  });
};
