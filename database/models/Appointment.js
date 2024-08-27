import mongoose from "mongoose"



const appointmentSchema = new mongoose.Schema({
    patientId:{
        type:String,
        required:true
    },
    patientName:{
        type:String,
        required:true
    }
    ,
    doctorId:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:String,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    appointmentType:{
        type:String,
        required:true
    },
    callId:{
       type:String,
    },
    status:{
        type:String,
        enum:["scheduled","canceled","completed"],
        default:"scheduled"
    }
})


const appointment = new mongoose.model("appointment",appointmentSchema)

export default appointment