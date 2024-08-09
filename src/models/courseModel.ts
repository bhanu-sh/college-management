import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.course || mongoose.model("course", courseSchema);

export default Course;
