import health_worker from "../database/models/Healthworker.js";

export const getAllHealthworkers = async (req, res) => {
  const { search } = req.body;
  let allworkers
  if (search == " ") {
    allworkers = await health_worker.find();
  }
  else{
    // Create a case-insensitive regex for search that matches the start of the string
    const searchRegex = new RegExp(`^${search}`, "i");
    allworkers = await health_worker.find({
      $or: [
        { name: searchRegex },
        { specialty: searchRegex },
        { location: searchRegex },
        // Add other fields you want to search in
      ],
    });
  }

  if (!allworkers || allworkers.length == 0) {
    return res.status(400).json({
      msg: "No health worker available",
    });
  }
  res.status(200).json({
    msg: allworkers,
  });
};
