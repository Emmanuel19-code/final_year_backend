import express from "express";
import { registerHealthworkeraccount } from "../HealthworkerController/registerhealthworkers.js";
import { getAllHealthworkers } from "../HealthworkerController/getHealthworkers.js";
import { SignHealthworker } from "../HealthworkerController/sign_In_healthworker.js";
import { HDelete } from "../HealthworkerController/HDelete.js";
import { ActivateAccount } from "../HealthworkerController/activateaccount.js";
import { HealthworkerAuthetication, Verifyhealthworker } from "../middlewares/authentication.js";
import { InvolvedConversation } from "../HealthworkerController/InvoledConversation.js";



const router = express.Router();

router.post("/registerhealthworker", registerHealthworkeraccount);
router.post("/healthworker",getAllHealthworkers)
router.post("/login",SignHealthworker)
router.post("/verify", Verifyhealthworker,ActivateAccount);
router.delete("/deleteh",HDelete)
router.post("/searchworker",getAllHealthworkers)
router.get("/get_conversation",HealthworkerAuthetication,InvolvedConversation)



export default router