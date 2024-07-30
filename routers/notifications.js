import express from "express"
import { SendNotifcationToUser } from "../NotificationController/sendToUser.js"
import {
  HealthworkerAuthetication,
} from "../middlewares/authentication.js";
import { SendNotifcationToAll } from "../NotificationController/sendToAll.js";
const router = express.Router()

router.post("/send_to_user",HealthworkerAuthetication,SendNotifcationToUser)
router.post("/send_to_all",HealthworkerAuthetication,SendNotifcationToAll)

export default router