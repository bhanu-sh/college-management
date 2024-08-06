import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["sent", "received"],
      required: true,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Expense =
  mongoose.models.expense || mongoose.model("expense", expenseSchema);

export default Expense;