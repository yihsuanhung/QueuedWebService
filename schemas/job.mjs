import mongoose from "mongoose";

const name = "job";

const schema = new mongoose.Schema(
  {
    job_id: String,
    name: String,
    status: {
      type: String,
      enum: ["queued", "completed", "failed"],
      default: "queued",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model(name, schema);
