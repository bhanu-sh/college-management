import { connect } from "@/dbConfig/dbConfig";
import Staff from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    console.log("URL:", url);
    const college_id = url.searchParams.get("college_id");
    console.log("college_id:", college_id);

    if (!college_id) {
      return NextResponse.json(
        { error: "college_id is required" },
        { status: 400 }
      );
    }

    const users = await Staff.find({ college_id });
    return NextResponse.json({ data: users });
  } catch (error: any) {
    console.error("Error finding staff:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
