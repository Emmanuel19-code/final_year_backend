import express from "express";
import createConversation from "../Conversationcontroller/createconversation.js";
import getConversation from "../Conversationcontroller/getconversation.js";
import {  Authentication } from "../middlewares/authentication.js";

const router = express.Router()

router.post("/user_create_conversation",Authentication,createConversation)
router.get("/get_conversation:user_id",Authentication,getConversation)


export default router