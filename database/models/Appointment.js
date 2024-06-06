import mongoose from "mongoose"
import { v4 as uuidv4 } from 'uuid';


const uniqueToken = uuidv4().split("-")[0];

const appointmentSchema = new mongoose.Schema({
    appointmentId:{
        type:String,
        unique:true,
        default:uniqueToken
    },
    patientId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["scheduled","canceled","completed"],
        default:"scheduled"
    }
})


const appointment = new mongoose.model("appointment",appointmentSchema)

export default appointment