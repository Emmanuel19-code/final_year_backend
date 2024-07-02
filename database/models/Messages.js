import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    content:{
        type:String
    }
},{timestamps:true})


const message = mongoose.model("messages",MessageSchema)
export default message