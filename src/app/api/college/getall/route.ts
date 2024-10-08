import { connect } from "@/dbConfig/dbConfig";
import College from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {

    const colleges = await College.find();
    return NextResponse.json({ data: colleges });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}