import mongoose from "mongoose";

const arrayLimit = (val) => {
  return val.length <= 2;
};

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: Array,
      required: true,
      validate: [arrayLimit, "{PATH} exceeds the limit of 2 participants"],
    },
  },
  { timestamps: true }
);

const conversation = mongoose.model("Conversation", conversationSchema);

export default conversation;
