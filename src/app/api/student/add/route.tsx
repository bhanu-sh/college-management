import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
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
      password,
      roll,
      aadhar,
      course,
      session_start_year,
      session_end_year,
      college_id,
    } = reqBody;

    console.log(reqBody);

    // Check if Student already exists
    const student = await Student.findOne({ phone });

    if (student) {
      return NextResponse.json(
        { error: "Student already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password ? password : "123", salt);

    // Create new Student
    const newStudent = new Student({
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
      college_id: college_id,
      password: hashedPassword,
      role: "Student",
      roll_no: roll,
      aadhar,
      course,
      session_start_year,
      session_end_year,
    });

    const savedStudent = await newStudent.save();

    return NextResponse.json({
      message: "Student addedd successfully",
      success: true,
      savedStudent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
