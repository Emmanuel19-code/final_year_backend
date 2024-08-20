import express from "express"
import { HealthworkerAuthetication } from "../middlewares/authentication.js";
import { CreatingMeetingDetails } from "../MeetingRoom/createMeeting.js";
import { JoinMeeting } from "../MeetingRoom/joinmeeting.js";


const MeetingRouter = (io) => {
  const router = express.Router();
  router.get("/new_meeting",HealthworkerAuthetication,CreatingMeetingDetails)
  router.post("/join_meeting",JoinMeeting(io))
  return router;
};

export default MeetingRouter