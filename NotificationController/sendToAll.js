import notificaion from "../database/models/Notification.js";
import user from "../database/models/user.js";

export const SendNotifcationToAll = async (req, res) => {
    try {
         const { title, message, data } = req.body;
         if (!title || !message) {
           return res.status(400).json({
             msg: "Please provide the missing fields",
           });
         }
         const users = await user.find();
         if (!users) {
           return res.status(400).json({
             msg: "could not find any user",
           });
         }
         const create = await Promise.all(
           users.map((user)=>
notificaion.create({
           userId:user.uniqueId,
           title,
           message,
           data,
         })
           )
          );
         if (!create) {
           return res.status(400).json({
             msg: "could not send please try again",
           });
         }
         res.status(200).json({
           msg: "Notification has been sent",
         });
    } catch (error) {
        return res.status(400).json({
            msg:"an error occured",
            error:error
        })
    }
 
};
