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
    aadhar: {
      type: String,
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
    roll_no: {
      type: String,
    },
    password: {
      type: String,
      default: "123456",
    },
    role: {
      type: String,
      default: "Student",
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    course_fee: {
      type: Number,
    },
    bus_fee: {
      type: Number,
    },
    con_fee: {
      type: Number,
    },
    total_fee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.student || mongoose.model("student", studentSchema);

export default Student;
