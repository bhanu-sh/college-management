import { connect } from "@/dbConfig/dbConfig";
import Staff from "@/models/staffModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Admin from "@/models/adminModel";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const userID = getDataFromToken(request);
    console.log("request", request);
    if (!userID) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const user = await Admin.findById({ _id: userID }).select("-password");
    if (!user) {
      return NextResponse.json({ message: "Forbidden" }, { status: 404 });
    }
    const reqBody = await request.json();
    console.log("Request body:", reqBody); // Log the request body
    const { staff } = reqBody;

    if (!Array.isArray(staff) || staff.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty staff array provided" },
        { status: 400 }
      );
    }

    const results = [];

    for (const staffMember of staff) {
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
        college_id,
        password,
      } = staffMember;

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

        // Check if staff already exists
        const staffExist = await Staff.findOne({ phone });

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
        const newStaff = new Staff({
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
