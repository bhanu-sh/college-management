import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Admin from "@/models/adminModel";
import College from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    const userID = getDataFromToken(request);
    const user = await Admin.findById({ _id: userID }).select("-password");
    if (!user) {
      return NextResponse.json({ message: "Forbidden" }, { status: 404 });
    }
    const colleges = await College.find();
    return NextResponse.json({ data: colleges });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}