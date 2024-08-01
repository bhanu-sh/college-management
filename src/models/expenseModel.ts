import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    college_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "college",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense =
  mongoose.models.expense || mongoose.model("expense", expenseSchema);

export default Expense;
