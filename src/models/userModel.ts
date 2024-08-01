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
      default: 0,
    },
    bus_fee: {
      type: Number,
      default: 0,
    },
    hostel_fee: {
      type: Number,
      default: 0,
    },
    exam_fee: {
      type: Number,
      default: 0,
    },
    library_fee: {
      type: Number,
      default: 0,
    },
    practical_fee: {
      type: Number,
      default: 0,
    },
    security_fee: {
      type: Number,
      default: 0,
    },
    con_fee: {
      type: Number,
      default: 0,
    },
    paid_fee: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
