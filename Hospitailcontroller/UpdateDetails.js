import allWorkers from "../database/models/AllworkersId.js";
import HealthWorker from "../database/models/Healthworker.js";

export const AdminUpdateWorker = async (req, res) => {
    try {
        const { name, role } = req.body;
        const {staff_id} = req.params
        const filter = { healthworkerId: staff_id };
        const updateFields = {};
        
        if (name) updateFields.name = name;
        if (role) updateFields.role = role;

        if (Object.keys(updateFields).length === 0) {
          return res.status(400).json({
            msg: "No fields to update",
          });
        }
        const updateDoc = {
          $set: updateFields,
        };
        const result = await allWorkers.findOneAndUpdate(filter, updateDoc, {
          new: true,
        });
        const resultTwo =await HealthWorker.findOneAndUpdate(filter,updateDoc,{
          new:true
        })
        
        if (!result || !resultTwo) {
          return res.status(400).json({
            msg: "Please try again",
          });
        }
        res.status(200).json({
          msg: "Successfully updated",
          data: result,
        });
    } catch (error) {
        return res.status(500).json({
            errorMsg:"An error occured",
            error:error.message
        })
    }
  
};
