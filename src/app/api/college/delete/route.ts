import { connect } from "@/dbConfig/dbConfig";
import College from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log("Request body:", reqBody);
    const { college } = reqBody;

    if (!Array.isArray(college) || college.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty college array provided" },
        { status: 400 }
      );
    }

    const results = [];

    for (const college_id of college) {
      try {
        const collegeExist = await College.findOne({ _id: college_id });

        if (!collegeExist) {
          results.push({
            college_id,
            status: "error",
            message: "College does not exist",
          });
          continue;
        }

        await College.deleteOne({ _id: college_id });

        results.push({
          college_id,
          status: "success",
          message: "College deleted successfully",
        });
      } catch (error: any) {
        results.push({
          college_id,
          status: "error",
          message: error.message,
        });
      }
    }

    return NextResponse.json({ data: results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
