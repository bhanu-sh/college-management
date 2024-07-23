import { connect } from "@/dbConfig/dbConfig";
import Staff from "@/models/staffModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
      //find staff by college id
        const url = new URL(request.url);
        const collegeId = url.searchParams.get("collegeId");

        if (!collegeId) {
          return NextResponse.json(
            { error: "College ID query parameter is required" },
            { status: 400 }
          );
        }

        const staff = await Staff.find({ collegeId });

        if (!staff) {
          return NextResponse.json(
            { error: "Staff not found" },
            { status: 404 }
          );
        }

        return NextResponse.json({
          message: "Staff Found",
          data: staff
        });

        
    } catch (error: any) {
      console.error("Error finding staff:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  