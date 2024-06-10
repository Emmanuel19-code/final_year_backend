import express from "express";
import { registerHealthworkeraccount } from "../HealthworkerController/registerhealthworkers.js";
import { getAllHealthworkers } from "../HealthworkerController/getHealthworkers.js";

const router = express.Router();

router.post("/registerhealthworker", registerHealthworkeraccount);
router.get("/healthworker",getAllHealthworkers)
