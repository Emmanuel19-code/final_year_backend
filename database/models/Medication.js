import mongoose from "mongoose"


const medicationDetails = new mongoose.Schema({
     name:{
        type:String
     },
     dosage:{
        type:String
     },
     frequency:{
        type:String
     },
     routeOfAdministration:{
        type:String
     }
})


const medicationSchema = new mongoose.Schema({
    medicationId:{
        type:String,
    },
    medications:[medicationDetails],
    prescribingDoctor:{
        type:String
    }
})


const medication = new mongoose.model("medication",medicationSchema)