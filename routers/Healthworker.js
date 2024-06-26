import express from "express";
import { registerHealthworkeraccount } from "../HealthworkerController/registerhealthworkers.js";
import { getAllHealthworkers } from "../HealthworkerController/getHealthworkers.js";
import { SignHealthworkder } from "../HealthworkerController/sign_In_healthworker.js";

const router = express.Router();

router.post("/registerhealthworker", registerHealthworkeraccount);
router.post("/healthworker",getAllHealthworkers)
router.post("/login",SignHealthworkder)

export default router