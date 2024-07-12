import user from "../database/models/user.js";

export const Userprofile = async (req, res) => {
  try {
    const userid = req.user.uniqueId;
    const user_profile = await user
      .findOne({ uniqueId: userid })
      .select("name email uniqueId phone");
    return res.status(200).json({
      data: user_profile,
    });
  } catch (error) {
     return res.status(400).json({
      msg:"an error occured while fetching your data"
     })
  }
  
};
