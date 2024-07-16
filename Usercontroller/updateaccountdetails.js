import user from "../database/models/user.js";


export const updateUserInfo = async (req, res) => {
  const { email, phone, Address } = req.body;
  const user_id = req.user.uniqueId;
  const filter = { uniqueId: user_id };

  // Create the update object dynamically
  const updateFields = {};
  if (email) updateFields.email = email;
  if (phone) updateFields.phone = phone;
  if (Address) updateFields.Address = Address;

  // If no fields to update, return an error response
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({
      msg: "No fields to update",
    });
  }

  const updateDoc = {
    $set: updateFields,
  };

  try {
    const result = await user.findOneAndUpdate(filter, updateDoc, {
      new: true,
    })
    if (!result) {
      return res.status(400).json({
        msg: "Please try again",
      });
    }
    res.status(200).json({
      msg: "Successfully updated",
      userInfo: {
        uniqueId: result.uniqueId,
        profilePicture: result.profilePicture,
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
        name: result.name,
        email: result.email,
        role: result.role,
        phone: result.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
};

