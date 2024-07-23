import { NextRequest, NextResponse } from "next/server";
import College from "@/models/collegeModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

// Find college by slug
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug query parameter is required" },
        { status: 400 }
      );
    }

    const college = await College.findOne({ slug });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "College Found",
      data: college,
    });
  } catch (error: any) {
    console.error("Error finding college:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

