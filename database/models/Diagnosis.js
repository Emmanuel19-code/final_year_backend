import mongoose from "mongoose"



const diagnosisSchema = new mongoose.Schema({
    patientId:{
        type:String,
        required:true
    },
    diagnosisDescription:[],
    dataOfDiagnosis:{
        type:Date,
        required:true
    },
    doctorDiagnosed:{
        type:String
    }
})


const diagnosis = new mongoose.model("diagnosis",diagnosisSchema)

export default diagnosis
