import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    PaidBy: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    datePaid: {
      type: Date,
      default: Date.now,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "failed", "successful"],
      default: "pending",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: [
        "Credit Card",
        "Debit Card",
        "Paypal",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
