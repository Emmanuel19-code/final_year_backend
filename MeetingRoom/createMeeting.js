import meeting from "../database/models/MeetingRooms.js";
import { v4 as uuidv4 } from "uuid";


export const CreatingMeetingDetails = async(req,res)=>{
    try {
        const meetingId = uuidv4().split("-")[0];
        const password = uuidv4().slice(0, 6);
        const createMeeting = await meeting.create({
             meetingId:meetingId,
             meetingPassword:password
        })
        if(!createMeeting){
            return res.status(400).json({
                msg:"Could not create meeting"
            })
        }
        console.log(createMeeting);
        
        res.status(200).json({
            msg:"Here are the details of your new meeting",
            meetingId:meetingId,
            meetingPassword:password
        })
    } catch (error) {
        return res.status(500).json({
            msg:"an error occured",
            error:error
        })
    }
}