import express from "express";
import createConversation from "../Conversationcontroller/createconversation.js";
import {  Authentication } from "../middlewares/authentication.js";

const router = express.Router()

router.post("/user_create_conversation",Authentication,createConversation)



export default router