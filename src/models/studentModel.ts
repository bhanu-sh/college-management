import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    f_name: {
      type: String,
    },
    l_name: {
      type: String,
    },
    father_name: {
      type: String,
    },
    mother_name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      default: "123",
    },
    role: {
      type: String,
      default: "Student",
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "colleges",
    },
    roll_no: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
    session_start_year: {
      type: String,
    },
    session_end_year: {
      type: String,
    },
    fees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "fees",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.students || mongoose.model("students", studentSchema);

export default Student;
