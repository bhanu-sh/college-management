import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      userId,
      f_name,
      l_name,
      father_name,
      mother_name,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      pincode,
      roll_no,
      aadhar,
      course,
      session_start_year,
      session_end_year,
    } = reqBody;

    console.log(reqBody);

    // Check if User exists
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Update User
    const updated = await User.updateOne({ _id: userId }, {});

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
