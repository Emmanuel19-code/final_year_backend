import express from "express"
import { createAppointment } from "../Appointment/AppointmentCreate.js";
import { appointmentReschedule } from "../Appointment/AppointmentReschedule.js";
import {Authentication, HealthworkerAuthetication}  from "../middlewares/authentication.js";
import { Cancelappointment } from "../Appointment/AppointementCancel.js";



const appointmentRouter = ()=>{
const router = express.Router();
router.post("/create-appointment", Authentication,(req,res)=>createAppointment(req,res,io));
router.put("/update-appointment", Authentication, appointmentReschedule);
router.post("/cancel_appointment", Authentication, Cancelappointment);
return router
}




export default appointmentRouter