import express from "express";
import createConversation from "../Conversationcontroller/createconversation.js";
import getConversation from "../Conversationcontroller/getconversation.js";

const router = express.Router()

router.post("/create_conversation",createConversation)
router.get("/get_conversation:user_id",getConversation)


export default router