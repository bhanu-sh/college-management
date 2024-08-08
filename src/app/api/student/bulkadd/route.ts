import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import Fee from "@/models/feeModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();
    console.log("Request body:", reqBody);
    const { user } = reqBody;

    if (!Array.isArray(user) || user.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty Student array provided" },
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
        pincode,
        password,
        roll,
        aadhar,
        course,
        course_fee,
        paid_fee,
        session_start_year,
        session_end_year,
        college_id,
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
        const studentExist = await Student.findOne({ phone });

        if (studentExist) {
          results.push({
            phone,
            status: "error",
            message: "Student already exists",
          });
          continue;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new student
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
          pincode,
          college_id,
          password: hashedPassword,
          role: "Student",
          roll_no: roll,
          aadhar,
          course,
          session_start_year,
          session_end_year,
        });

        // Save Student
        const savedStudent = await newStudent.save();

        const course_receipt_no = (await Fee.countDocuments({})) + 1;

        const newCourseFee = new Fee({
          name: "Course Fee",
          description: "Course Fee",
          amount: course_fee,
          type: "fee",
          receipt_no: course_receipt_no,
          college_id,
          student_id: savedStudent._id,
        });

        await newCourseFee.save();

        const paid_receipt_no = (await Fee.countDocuments({})) + 1;

        const newPaidFee = new Fee({
          name: "Paid Fee",
          description: "Paid Fee",
          amount: paid_fee,
          receipt_no: paid_receipt_no,
          type: "received",
          college_id,
          student_id: savedStudent._id,
        });

        await newPaidFee.save();

        newStudent.fees.push(newCourseFee._id, newPaidFee._id);
        await newStudent.save();

        results.push({
          phone,
          status: "success",
          message: "Student created successfully",
          savedStudent,
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
      message: "Student processing completed",
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
