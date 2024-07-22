import { connect } from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    console.log(reqBody);

    // Check if admin already exists
    const admin = await Admin.findOne({ email });

    if (admin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      f_name: name,
      email,
      password: hashedPassword,
    });

    // Save admin
    const savedAdmin = await newAdmin.save();
    console.log(savedAdmin);

    return NextResponse.json({
      message: "Admin created successfully",
      success: true,
      savedAdmin,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
