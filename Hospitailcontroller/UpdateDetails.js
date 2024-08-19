import allWorkers from "../database/models/AllworkersId.js";
import HealthWorker from "../database/models/Healthworker.js";

export const AdminUpdateWorker = async (req, res) => {
  try {
    const { role } = req.body;
    const { staff_id } = req.params;
    const filter = { healthworkerId: staff_id };

    if (!role) {
      return res.status(400).json({
        msg: "No fields to update",
      });
    }

    const updateDoc = { $set: { role } };
    const existingWorker = await allWorkers.findOne(filter);

    if (!existingWorker) {
      return res.status(404).json({
        msg: "Worker not found with the provided staff ID",
      });
    }

    const updatedWorker = await allWorkers.findOneAndUpdate(filter, updateDoc, {
      new: true,
    });

    const registeredWorker = await HealthWorker.findOne(filter);

    let updatedHealthWorker = null;
    let message = "Successfully updated in allWorkers collection.";

    if (registeredWorker) {
      updatedHealthWorker = await HealthWorker.findOneAndUpdate(
        filter,
        updateDoc,
        { new: true }
      );
      message =
        "Successfully updated in both allWorkers and HealthWorker collections.";
    } else {
      message +=
        " However, the worker is not registered in HealthWorker, so the update was not applied there.";
    }
    return res.status(200).json({
      msg: message,
      data: updatedWorker,
    });
  } catch (error) {
    console.error("Error during update:", error);
    return res.status(500).json({
      errorMsg: "An error occurred",
      error: error.message,
      stack: error.stack,
    });
  }
};
