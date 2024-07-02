import express from "express"
import { createAppointment } from "../Appointment/AppointmentCreate.js";
import { cancelappointment } from "../Appointment/AppointementCancel.js";
import { appointmentReschedule } from "../Appointment/AppointmentReschedule.js";
import { getbookedappointment } from "../HealthworkerController/getBookedAppointment.js";
import Authenticate from "../middlewares/authentication.js";

const router = express.Router()


router.post("/create-appointment",Authenticate,createAppointment)
router.post("/cancel-appointment",Authenticate,cancelappointment)
router.put("/update-appointment",Authenticate,appointmentReschedule)
router.get(`/received-appointment`,Authenticate,getbookedappointment)

export default router