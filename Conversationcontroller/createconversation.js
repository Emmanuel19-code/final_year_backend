import Conversation from "../database/models/conversation.js";

const createConversation = async (req, res) => {
  try {
    const { participantId } = req.body;
    if (participantId ===  req.healthWorker.healthworkerId) {
      return res.status(400).json({
        msg: "cannot create a conversation with yourself",
      });
    }
     const existingConversation = await Conversation.findOne({
       participants: { $all: [ req.healthWorker.healthworkerId, participantId] },
     });
     if(existingConversation){
        return res.status(400).json({
          msg:"you already have a conversation with this user"
        })
     }
    let newConversation = await Conversation.create({
      participants: [ req.healthWorker.healthworkerId, participantId],
    });
    if (!newConversation) {
      return res.status(400).json({
        msg: "Please try again",
      });
    }

    res.status(201).json({
      msg: "conversation created",
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      msg: "an error occurred while creating conversation",
    });
  }
};

export default createConversation;
