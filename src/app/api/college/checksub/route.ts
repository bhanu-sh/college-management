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
    const date = new Date();

    if (college.subscriptionValidity < date) {
      return NextResponse.json({ subscribed: false });
    }
    return NextResponse.json({ subscribed: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
