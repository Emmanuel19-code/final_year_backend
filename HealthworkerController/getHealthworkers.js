import HealthWorker from "../database/models/Healthworker.js";

export const getAllHealthworkers = async (req, res) => {
  try {
    const { search } = req.body;
     let allworkers
    if (search == " ") {
      return res.status(400).json({
        msg:"No healthworker found"
      })
    } else {
      // Create a case-insensitive regex for search that matches the start of the string
      const searchRegex = new RegExp(`^${search}`, "i");
        allworkers = await HealthWorker.find({
          $or: [{ name: searchRegex }, { specialty: searchRegex }],
        }).select(
          "name about workingdays experience specialty endTime startTime phone email healthworkerId"
        );
    }

    if (!allworkers || allworkers.length == 0) {
      return res.status(400).json({
        msg: "No health worker available",
      });
    }
    res.status(200).json({
      msg: allworkers,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg:"an error occured please try again"
    })
  }
  
};
