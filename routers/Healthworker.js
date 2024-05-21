import express from "express";
import { registerHealthworkeraccount } from "../HealthworkerController/registerhealthworkers.js";

const router = express.Router();

router.post("/registerhealthworker", registerHealthworkeraccount);
