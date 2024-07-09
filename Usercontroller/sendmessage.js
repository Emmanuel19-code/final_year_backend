import message from "../database/models/Messages.js";


const SendMessage = async(req,res)=>{
  try {
    const { conversationId,  content } = req.body;
    const newmessage = await message.create({
       conversationId:conversationId,
       content:content,
       sender:req.user.uniqueId
    })
    if(!newmessage){
       return res.status(400).json({
         message:"message not sent"
       })
    }
    res.status(200).json({
        msg:"message successfully sent"
    })
  } catch (error) {
    return res.status(400).json({
        msg:"An error occured while trying to send the message"
    })
  }
  
}

export default SendMessage