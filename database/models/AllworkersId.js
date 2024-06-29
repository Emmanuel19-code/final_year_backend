import mongoose from "mongoose"


const Allworker_schema = new mongoose.Schema(
  {
    hospital_health_workers: [
      { name: String, role: String, healthWorkerId: String },
    ],
  },
  { timestamps: true }
);


const all_workers = mongoose.model("AllworkersId", Allworker_schema);

export default all_workers;