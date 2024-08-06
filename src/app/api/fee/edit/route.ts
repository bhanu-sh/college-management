import { connect } from "@/dbConfig/dbConfig";
import Fee from "@/models/feeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id, name, description, amount } = reqBody;

    console.log(reqBody);

    // Check if Fee exists
    const fee = await Fee.findOne({ _id: id });

    if (!fee) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Update User
    const updated = await Fee.updateOne(
      { _id: id },
      {
        name: name !== "" ? name : fee.name,
        description: description !== "" ? description : fee.description,
        amount: amount !== "" ? amount : fee.amount,
      }
    );

    console.log(updated);

    return NextResponse.json({
      message: "Fee paid successfully",
      success: true,
      updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
