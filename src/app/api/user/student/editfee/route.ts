import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      userId,
      course_fee,
      bus_fee,
      hostel_fee,
      exam_fee,
      library_fee,
      practical_fee,
      security_fee,
      con_fee,
      paid_fee,
    } = reqBody;

    console.log(reqBody);

    // Check if User exists
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Update User
    const updated = await User.updateOne(
      { _id: userId },
      {
        course_fee: course_fee !== "" ? course_fee : user.course_fee,
        bus_fee: bus_fee !== "" ? bus_fee : user.bus_fee,
        hostel_fee: hostel_fee !== "" ? hostel_fee : user.hostel_fee,
        exam_fee: exam_fee !== "" ? exam_fee : user.exam_fee,
        library_fee: library_fee !== "" ? library_fee : user.library_fee,
        practical_fee:
          practical_fee !== "" ? practical_fee : user.practical_fee,
        security_fee: security_fee !== "" ? security_fee : user.security_fee,
        con_fee: con_fee !== "" ? con_fee : user.con_fee,
        paid_fee: paid_fee !== "" ? paid_fee : user.paid_fee,
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
