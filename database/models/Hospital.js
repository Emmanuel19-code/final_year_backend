import mongoose from "mongoose"


const hospitalSchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      unique: true,
      required: true,
    },
    oragnizationName: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    call_line1: {
      type: String,
      required: true,
      unique: true,
    },
    call_line2: {
      type: String,
      unique: true,
      required: false,
    },
    hospital_type: {
      type: String,
      required: true,
      enum: ["generalized", "specialized"],
    },
    number_of_healthworkers: {
      type: Number,
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
    },
    ceo_name: {
      type: String,
      required: true,
    },
    hospital_health_workers: [
      { name: String, role: String, companyid: String },
    ],
    all_health_workers_id: [{ companyid: String }],
  },
  { timestamps: true }
);


const hospital = mongoose.model("hospital", hospitalSchema);

export default hospital;