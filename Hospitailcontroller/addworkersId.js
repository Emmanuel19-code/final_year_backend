import all_workers from "../database/models/AllworkersId.js";

export const AddworkersId = async (req, res) => {
    try {
        const { healthWorkerId, name,role } = req.body;
        if (!healthWorkerId) {
          return res.status(400).json({
            msg: "Field cannot be empty",
          });
        }
        const is_added = await all_workers.findOne({healthWorkerId:healthWorkerId})
        if(is_added){
            return res.status(400).json({
                msg:"A worker with this staffId is available"
            })
        }
        const create = all_workers.create({
          name: name,
          healthWorkerId: healthWorkerId,
          role:role
        });
        if (!create) {
          return res.status(400).json({
            msg: "couln't add please try again",
          });
        }
        res.status(200).json({
          msg: "worker has been added successfully",
        }); 
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg:"an error occured",
            error:error
        })
    }
 
};
