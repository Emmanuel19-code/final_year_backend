import express from "express";
import sendMessage from "../Message/sendmessage.js";

const router = express.Router()

router.post("newmessage/",sendMessage)



export default router