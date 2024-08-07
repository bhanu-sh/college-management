import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, ...rest } = reqBody;

    if (!_id) {
      return NextResponse.json(
        { error: "Student ID not provided" },
        { status: 400 }
      );
    }

    const student = await Student.findOne({ _id });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await Student.updateOne({ _id }, rest);

    return NextResponse.json({ message: "Student updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
