import mongoose from "mongoose"


const appointmentSchema = new mongoose.Schema({
    appointmentId:{
        type:String,
        unique:true
    },
    patientId:{
        type:String
    },
    doctorId:{
        type:String
    },
    appointmentDate:{
        type:Date
    },
    status:{
        type:String,
        enum:["scheduled","canceled","completed"]
    }
})


const appointment = new mongoose.model("appointment",appointmentSchema)

export default appointment