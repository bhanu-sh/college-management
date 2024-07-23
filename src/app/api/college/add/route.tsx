import { connect } from "@/dbConfig/dbConfig";
import College from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, phone, address, city, state, pincode } = reqBody;

    console.log(reqBody);

    // Check if college already exists
    const college = await College.findOne({ name });

    if (college) {
      return NextResponse.json(
        { error: "College already exists" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/ /g, "-");

    // Create new College
    const newCollege = new College({
      name,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      slug,
    });

    // Save College
    const savedCollege = await newCollege.save();
    console.log(savedCollege);

    return NextResponse.json({
      message: "College created successfully",
      success: true,
      savedCollege,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
