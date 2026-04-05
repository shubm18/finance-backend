import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model("Record", recordSchema);

export default Record;
