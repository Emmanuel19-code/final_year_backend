import express from "express";
import { registerHealthworkeraccount } from "../HealthworkerController/registerhealthworkers.js";
import { getAllHealthworkers } from "../HealthworkerController/getHealthworkers.js";
import { SignHealthworker } from "../HealthworkerController/sign_In_healthworker.js";
import { HDelete } from "../HealthworkerController/HDelete.js";
import { ActivateAccount } from "../HealthworkerController/activateaccount.js";
import { HealthworkerAuthetication, Verifyhealthworker } from "../middlewares/authentication.js";
import { InvolvedConversation } from "../HealthworkerController/InvoledConversation.js";
import SendMessage from "../HealthworkerController/sendmessage.js";
import { UpdateHealthworkerInfo } from "../HealthworkerController/updateHealthworkerdetails.js";
import { Consultantprofile } from "../HealthworkerController/getConsultantProfile.js";
import { ConsultantGetbookedappointment } from "../Appointment/ConsultantGetbookedappointment.js";
import createConversation from "../Conversationcontroller/createconversation.js";
import { AllAppointments } from "../Appointment/GetAllAppointments.js";
import { WorkerInDepartMent } from "../HealthworkerController/workerInDepartment.js";
import { CompletedAppointment } from "../Appointment/AppointmentCompleted.js";

const router = express.Router();

router.post("/registerhealthworker", registerHealthworkeraccount);
router.post("/healthworker",getAllHealthworkers)
router.post("/login",SignHealthworker)
router.post("/verify", Verifyhealthworker,ActivateAccount);
router.delete("/deleteh",HDelete)
router.post("/searchworker",getAllHealthworkers)
router.get("/get_conversation",HealthworkerAuthetication,InvolvedConversation)
router.post("/send_message",HealthworkerAuthetication,SendMessage)
router.put("/healthworkerupdate_details",HealthworkerAuthetication,UpdateHealthworkerInfo)
router.get("/consultant_profile",HealthworkerAuthetication,Consultantprofile)
router.get("/my_received_appointmetns",HealthworkerAuthetication,ConsultantGetbookedappointment)
router.post("/create_conversation",HealthworkerAuthetication,createConversation)
router.get("/all_appointments",HealthworkerAuthetication,AllAppointments)
router.get("/departmentworkers/:department",WorkerInDepartMent)
router.put("/mark_appointment_completed/:appointmentId",HealthworkerAuthetication,CompletedAppointment)

export default router