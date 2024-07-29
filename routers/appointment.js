import express from "express"
import { createAppointment } from "../Appointment/AppointmentCreate.js";
import { appointmentReschedule } from "../Appointment/AppointmentReschedule.js";
import {Authentication, HealthworkerAuthetication}  from "../middlewares/authentication.js";
import {Getbookedappointment} from "../Appointment/getBookedAppointment.js"
import { Cancelappointment } from "../Appointment/AppointementCancel.js";

const router = express.Router()


router.post("/create-appointment",Authentication ,createAppointment)
router.put("/update-appointment",Authentication ,appointmentReschedule)
router.get(
  "/received-appointments",
  HealthworkerAuthetication,
  Getbookedappointment
);
router.post("/cancel_appointment", Authentication, Cancelappointment);



export default router