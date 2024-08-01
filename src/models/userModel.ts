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
    course: {
      type: String,
    },
    session_start_year: {
      type: String,
    },
    session_end_year: {
      type: String,
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
