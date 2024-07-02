import conversation from "../database/models/conversation.js";


const createConversation = async(req,res) =>{
   try {
     const { participantId } = req.body;
     if (participantId === req.user.id) {
       return res.status(400).json({
        msg:"cannot create a conversation with yourself"
       }) 
     }
     let exist_conversation = await conversation.findOne({
       participants: { $all: [req.user.id, participantId] },
     });

     if (!exist_conversation) {
       conversation = new conversation({
         participants: [req.user.id, participantId],
       });
       await conversation.save();
     }
     res.status(201).json({
        msg:"conversation created "
     });
   } catch (err) {
     res.status(400).send({
        msg:"an error occured whiles create conversation"
     });
   }
}

export default createConversation