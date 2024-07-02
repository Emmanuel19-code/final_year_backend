import message from "../database/models/Messages.js";


const sendMessage = async(req,res)=>{
  try {
    const { conversationId, sender, content } = req.body;
    const newMessage = new message({ conversationId, sender, content });
    await newMessage.save();
    res.status(200).json({
        msg:"message successfully sent"
    })
  } catch (error) {
    return res.status(400).json({
        msg:"An error occured while trying to send the message"
    })
  }
  
}

export default sendMessage