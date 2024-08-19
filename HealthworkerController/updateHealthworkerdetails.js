import HealthWorker from "../database/models/Healthworker.js";

export const UpdateHealthworkerInfo = async (req, res) => {
  try {
    const { email, phone, Address, startTime, endTime, about, workingDays } =
      req.body;
    const user_id = req.healthWorker.healthworkerId;
    const filter = { healthworkerId: user_id };
    const updateFields = {};
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (Address) updateFields.Address = Address;
    if (startTime) updateFields.startTime = startTime;
    if (endTime) updateFields.endTime = endTime;
    if (about) updateFields.about = about;
    if (Array.isArray(workingDays)) {
      updateFields.workingdays = workingDays;
    }
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        msg: "No fields to update",
      });
    }
    const updateDoc = {
      $set: updateFields,
    };

    const result = await HealthWorker.findOneAndUpdate(filter, updateDoc, {
      new: true,
    });

    if (!result) {
      return res.status(400).json({
        msg: "Update failed, please try again",
      });
    }

    res.status(200).json({
      msg: "Successfully updated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};
