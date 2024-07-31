import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    course_fee: {
      type: Number,
    },
    bus_fee: {
      type: Number,
    },
    hostel_fee: {
      type: Number,
    },
    exam_fee: {
      type: Number,
    },
    library_fee: {
      type: Number,
    },
    practical_fee: {
      type: Number,
    },
    security_fee: {
      type: Number,
    },
    con_fee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Fee = mongoose.models.fee || mongoose.model("fee", feeSchema);

export default Fee;
