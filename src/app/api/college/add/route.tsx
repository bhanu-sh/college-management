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

    // Create slug
    let slug = name.toLowerCase().replace(/ /g, "-");

    // Check if slug already exists
    const slugExists = await College.findOne({ slug });

    if (slugExists) {
      // Append random number to slug
      const random = Math.floor(Math.random() * 1000);
      const newSlug = `${slug}-${random}`;
      slug = newSlug;
    }

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