import express from "express"
import { createAppointment } from "../Appointment/AppointmentCreate.js";
import { cancelappointment } from "../Appointment/AppointementCancel.js";
import { appointmentReschedule } from "../Appointment/AppointmentReschedule.js";
import { getbookedappointment } from "../HealthworkerController/getBookedAppointment.js";
import {Authentication}  from "../middlewares/authentication.js";

const router = express.Router()


router.post("/create-appointment",Authentication ,createAppointment)
router.post("/cancel-appointment",Authentication ,cancelappointment)
router.put("/update-appointment",Authentication ,appointmentReschedule)
router.get(`/received-appointment`,Authentication ,getbookedappointment)

export default router