import { connect } from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { college_id } = reqBody;

    console.log(reqBody);

    if (!college_id) {
      return NextResponse.json(
        { error: "college_id is required" },
        { status: 400 }
      );
    }

    const users = await Expense.find({
      college_id: college_id,
    });
    return NextResponse.json({ data: users });
  } catch (error: any) {
    console.error("Error finding Expenses:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
