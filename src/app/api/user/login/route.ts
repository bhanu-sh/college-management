import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { phone, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    console.log(user);

    return NextResponse.json({ message: "User logged in", user });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
