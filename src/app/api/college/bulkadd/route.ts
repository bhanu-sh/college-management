import { connect } from "@/dbConfig/dbConfig";
import College from "@/models/collegeModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    console.log("Request body:", reqBody); // Log the request body
    const { colleges } = reqBody;

    if (!Array.isArray(colleges) || colleges.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty college array provided" },
        { status: 400 }
      );
    }

    const results = [];

    for (const college of colleges) {
      const { name, email, phone, address, city, state, pincode } = college;

      try {
        // Check if college already exists
        const collegeExist = await College.findOne({ name });

        if (collegeExist) {
          results.push({
            phone,
            status: "error",
            message: "College already exists",
          });
          continue;
        }

        // Create slug
        let slug = name.toLowerCase().replace(/ /g, "-");

        // Check if slug already exists
        const slugExists = await College.findOne({ slug });

        if (slugExists) {
          // Append random number to slug
          const random = Math.floor(Math.random() * 1000);
          const newSlug = `${slug}-${random}`;
          slug = newSlug;
        }

        // Create new college
        const newCollege = new College({
          name,
          email,
          phone,
          address,
          city,
          state,
          pincode,
          slug,
        });

        // Save college
        const savedCollege = await newCollege.save();
        console.log("Saved College:", savedCollege);

        results.push({
          name,
          status: "success",
          message: "College created successfully",
        });
      } catch (error: any) {
        console.error("Error saving college:", error.message);
        results.push({
          name,
          status: "error",
          message: error.message,
        });
      }
    }

    return NextResponse.json({ data: results });
  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
