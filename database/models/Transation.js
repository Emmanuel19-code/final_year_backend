import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    paidBy: {
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
      default: "successful",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "Paypal"],
      default: "Credit Card",
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
