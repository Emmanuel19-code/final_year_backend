import meeting from "../database/models/MeetingRooms.js";

export const JoinMeeting = (io) => async (req, res) => {
  try {
    const { meetingId, meetingPassword, name } = req.body;
    if (!meetingId || !meetingPassword || !name) {
      return res.status(400).json({
        msg: "Please provide all required information",
      });
    }
    const searchMeeting = await meeting.findOne({ meetingId: meetingId });
    if (!searchMeeting) {
      return res.status(404).json({
        msg: "Could not find meeting ID",
      });
    }
    const isMatch = await searchMeeting.comparePassword(meetingPassword);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Incorrect meeting password",
      });
    }
    io.emit("joinedMeeting", {
      name,
    });
    res.status(200).json({
      msg: "Joined meeting successfully",
    });
  } catch (error) {
    console.error("Error joining meeting:", error);
    res.status(500).json({
      msg: "An error occurred while joining the meeting",
      error: error.message,
    });
  }
};
