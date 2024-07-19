import health_worker from "../database/models/Healthworker.js";

export const UpdateHealthworkerInfo = async (req, res) => {
  const { email, phone, Address, startTime, endTime, about } = req.body;
  const user_id = req.health_Worker.healthworkerIdd;
  const filter = { uniqueId: user_id };

  const updateFields = {};
  if (email) updateFields.email = email;
  if (phone) updateFields.phone = phone;
  if (Address) updateFields.Address = Address;
  if (startTime) updateFields.startTime = startTime;
  if (endTime) updateFields.endTime = endTime;
  if (about) updateFields.about = about;

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({
      msg: "No fields to update",
    });
  }

  const updateDoc = {
    $set: updateFields,
  };

  try {
    const result = await health_worker.findOneAndUpdate(filter, updateDoc, {
      new: true,
    });
    if (!result) {
      return res.status(400).json({
        msg: "Please try again",
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
