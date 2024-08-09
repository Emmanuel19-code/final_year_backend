import express from "express"
import { PaymentIntent } from "../Payment/makePayment.js"


const router = express.Router()


router.post("/make_payments",PaymentIntent)



export default router