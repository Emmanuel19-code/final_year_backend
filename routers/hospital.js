import express from "express";
import { AddworkersId } from "../Hospitailcontroller/addworkersId.js";
const router = express.Router()

router.post("/add_new_id",AddworkersId)

export default router