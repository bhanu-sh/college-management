import { connect } from "@/dbConfig/dbConfig";
import College from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { college_id } = reqBody;
    const college = await College.findById(college_id);
    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }
    college.lock = !college.lock;
    const status = college.lock ? "locked" : "unlocked";
    await college.save();
    return NextResponse.json({ message: status + " successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
