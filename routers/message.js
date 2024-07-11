import express from "express";
import { MessageInConversation } from "../Message/messageInConv.js";


const router = express.Router()

router.get("/getmessages/:conversationId",MessageInConversation)





export default router