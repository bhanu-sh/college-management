import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    lock: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
    },
    subscriptionValidity: {
      type: Date,
      default: () => {
        let date = new Date();
        date.setFullYear(date.getFullYear());
        return date;
      },
    },
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expense",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const College =
  mongoose.models.college || mongoose.model("college", collegeSchema);

export default College;
