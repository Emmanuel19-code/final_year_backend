import express from "express"
import { createAppointment } from "../Appointment/AppointmentCreate.js";
import { cancelappointment } from "../Appointment/AppointementCancel.js";
import { appointmentReschedule } from "../Appointment/AppointmentReschedule.js";
import { getbookedappointment } from "../HealthworkerController/getBookedAppointment.js";

const router = express.Router()


router.post("/create-appointment",createAppointment)
router.post("/cancel-appointment",cancelappointment)
router.put("/update-appointment",appointmentReschedule)
router.get(`/received-appointment`,getbookedappointment)

export default router