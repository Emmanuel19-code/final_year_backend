import mongoose from "mongoose"


const Allworker_schema = new mongoose.Schema(
  { name: String, role: String, healthworkerId: String },
  { timestamps: true }
);


const allWorkers = mongoose.model("AllworkersId", Allworker_schema);

export default allWorkers;