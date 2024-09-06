import HealthWorker from "../database/models/Healthworker.js";

export const Consultantprofile = async (req, res) => {
  try {
    const user_id = req.healthWorker.healthworkerId;
    console.log(user_id);
    
    const user_profile = await HealthWorker.findOne({
      healthworkerId: user_id,
    }).select("name email uniqueId phone healthworkerId startTime endTime");
    return res.status(200).json({
      data: user_profile,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "an error occured while fetching your data",
    });
  }
};
