import { connect } from "@/dbConfig/dbConfig";
import Course from "@/models/courseModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { college_id } = reqBody;

    console.log(reqBody);

    if (!college_id) {
      return NextResponse.json(
        { error: "college_id is required" },
        { status: 400 }
      );
    }

    const fees = await Course.find({ college_id });
    return NextResponse.json({ data: fees });
  } catch (error: any) {
    console.error("Error finding Fee:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}