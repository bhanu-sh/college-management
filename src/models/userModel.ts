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
      enum: ["Student", "Staff", "Admin"],
      default: "Student",
    },
    position: {
      type: String,
      enum: [
        "Principal",
        "Professor",
        "Assistant Professor",
        "Office Staff",
      ],
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

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
