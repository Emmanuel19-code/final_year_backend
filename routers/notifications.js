import express from "express"
import { SendNotifcationToUser } from "../NotificationController/sendToUser.js"
import {
  HealthworkerAuthetication,
  Authentication
} from "../middlewares/authentication.js";
import { SendNotifcationToAll } from "../NotificationController/sendToAll.js";
import { UserGetNotification } from "../NotificationController/UserGetNotice.js";
import { NotificationToRead } from "../NotificationController/readNotification.js";

const router = express.Router()

router.post("/send_to_user",HealthworkerAuthetication,SendNotifcationToUser)
router.post("/send_to_all",HealthworkerAuthetication,SendNotifcationToAll)
router.get("/all_notifications",Authentication,UserGetNotification)
router.post("/read",Authentication,NotificationToRead)

export default router