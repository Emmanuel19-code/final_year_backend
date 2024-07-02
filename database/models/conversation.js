import mongoose from "mongoose";

const arrayLimit = (val) => {
  return val.length <= 2;
};

const conversationSchema = new mongoose.Schema(
  {
    conversation: {
      type: Array,
      required: true,
      validate: [arrayLimit, "{PATH} exceeds the limit of 2 participants"],
    },
  },
  { timestamps: true }
);



const conversation = mongoose.model("conversation",conversationSchema)

export default conversation