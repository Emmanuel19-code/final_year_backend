import express from "express";
import { AddworkersId } from "../Hospitailcontroller/addworkersId.js";
import { AdminUpdateWorker } from "../Hospitailcontroller/UpdateDetails.js";
import {
  AdminAuthorization,
  HealthworkerAuthetication,
} from "../middlewares/authentication.js";
const router = express.Router();

router.post(
  "/add_new_id",
  HealthworkerAuthetication,
  AdminAuthorization,
  AddworkersId
);
router.post(
  "/update_worker_details/:staff_id",
  HealthworkerAuthetication,
  AdminAuthorization,
  AdminUpdateWorker
);

export default router;
