import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
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

    // Check if Student exists
    const user = await Student.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Update Student
    const updated = await Student.updateOne(
      { _id: userId },
      {
        f_name: f_name !== "" ? f_name : user.f_name,
        l_name: l_name !== "" ? l_name : user.l_name,
        father_name: father_name !== "" ? father_name : user.father_name,
        mother_name: mother_name !== "" ? mother_name : user.mother_name,
        email: email !== "" ? email : user.email,
        phone: phone !== "" ? phone : user.phone,
        dob: dob !== "" ? dob : user.dob,
        gender: gender !== "" ? gender : user.gender,
        address: address !== "" ? address : user.address,
        city: city !== "" ? city : user.city,
        state: state !== "" ? state : user.state,
        pincode: pincode !== "" ? pincode : user.pincode,
        roll_no: roll_no !== "" ? roll_no : user.roll_no,
        aadhar: aadhar !== "" ? aadhar : user.aadhar,
        course: course !== "" ? course : user.course,
        session_start_year:
          session_start_year !== ""
            ? session_start_year
            : user.session_start_year,
        session_end_year:
          session_end_year !== "" ? session_end_year : user.session_end_year,
      }
    );

    console.log(updated);

    return NextResponse.json({
      message: "Student Updated successfully",
      success: true,
      updated,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
