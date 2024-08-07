import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["received", "fee"],
      required: true,
    },
    method: {
      type: String,
      enum: ["cash", "cheque", "online"],
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
      required: true,
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Fee = mongoose.models.fee || mongoose.model("fee", feeSchema);

export default Fee;
