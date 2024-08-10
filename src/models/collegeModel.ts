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
        ref: "expenses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const College =
  mongoose.models.colleges || mongoose.model("colleges", collegeSchema);

export default College;
