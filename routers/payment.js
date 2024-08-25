import express from "express"
import { PaymentIntent } from "../Payment/makePayment.js"
import { StoreTransaction } from "../Payment/storeTransaction.js"
import {  Authentication } from "../middlewares/authentication.js";

const router = express.Router()


router.post("/make_payments",PaymentIntent)
router.post("/store_transaction",Authentication,StoreTransaction)



export default router