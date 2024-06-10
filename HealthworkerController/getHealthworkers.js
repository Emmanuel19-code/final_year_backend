import healthworker from "../database/models/Healthworker";

export const getAllHealthworkers = async (req, res) => {
  const { search } = req.body;
  let allworkers
  if (search == " ") {
    allworkers = await healthworker.find();
  }
  else{
    // Create a case-insensitive regex for search that matches the start of the string
    const searchRegex = new RegExp(`^${search}`, "i");
    allworkers = await healthworker.find({
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
