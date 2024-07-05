import health_worker from "../database/models/Healthworker.js";

export const HDelete = async (req, res) => {
  const del = await health_worker.deleteMany()
  if(!del){
    return res.status(400).json({
        msg:"couldn't please try again"
    })
  }
  res.status(200).json({
    msg:"it has been delete"
  })
};
