import mongoose from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const meetingSchema = new mongoose.Schema({
    meetingId:{
        type:String
    },
    meetingPassword:{
        type:String
    }
})


meetingSchema.pre("save", async function () {
  if (!this.isModified("meetingPassword")) return;
  const salt = await bcrypt.genSalt(10);
  this.meetingPassword = await bcrypt.hash(this.meetingPassword, salt);
});

meetingSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.meetingPassword);
  return isMatch;
};


const meeting = mongoose.model("meetingDetails",meetingSchema)
export default meeting