import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();
    console.log("Request body:", reqBody); // Log the request body
    const { user } = reqBody;

    if (!Array.isArray(user) || user.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty staff array provided" },
        { status: 400 }
      );
    }

    const results = [];

    for (const student of user) {
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
        roll_no,
        aadhar,
        course,
        session_start_year,
        session_end_year,
        course_fee,
        exam_fee,
        library_fee,
        college_id,
        practical_fee,
        security_fee,
        con_fee,
      } = student;

      try {
        // Validate phone and password
        if (
          !phone ||
          typeof phone !== "string" ||
          !password ||
          typeof password !== "string"
        ) {
          results.push({
            phone,
            status: "error",
            message: "Invalid phone or password format",
          });
          continue;
        }

        // Check if student already exists
        const staffExist = await User.findOne({ phone });

        if (staffExist) {
          results.push({
            phone,
            status: "error",
            message: "Staff already exists",
          });
          continue;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new staff
        const newStaff = new User({
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
          college_id,
          password: hashedPassword,
          role: "Student",
          roll_no,
          aadhar,
          course,
          session_start_year,
          session_end_year,
          course_fee,
          exam_fee,
          library_fee,
          practical_fee,
          security_fee,
          con_fee,
        });

        // Save staff
        const savedStaff = await newStaff.save();
        results.push({
          phone,
          status: "success",
          message: "Staff created successfully",
          savedStaff,
        });
      } catch (error: any) {
        if (error instanceof Error) {
          results.push({ phone, status: "error", message: error.message });
        } else {
          results.push({
            phone,
            status: "error",
            message: "An unknown error occurred",
          });
        }
      }
    }

    return NextResponse.json({
      message: "Staff processing completed",
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
