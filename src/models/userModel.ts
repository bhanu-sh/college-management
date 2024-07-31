import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      default: "123",
    },
    role: {
      type: String,
      enum: ["Student", "Staff", "CollegeAdmin", "Admin"],
      default: "Student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
    },
    roll_no: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    session_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "session",
    },
    total_fee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fee",
    },
    paid_fee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
