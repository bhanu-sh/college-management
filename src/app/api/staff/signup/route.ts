import {connect} from "@/dbConfig/dbConfig";
import Staff from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {phone, password} = reqBody

        console.log(reqBody);

        // Check if staff already exists
        const staff = await Staff.findOne({phone})

        if (staff) {
            return NextResponse.json({error: 'Staff already exists'}, {status: 400})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new staff
        const newStaff = new Staff({
            phone,
            password: hashedPassword
        })


        // Save staff
        const savedStaff = await newStaff.save()
        console.log(savedStaff);

        return NextResponse.json({
            message: 'Staff created successfully',
            success: true,
            savedStaff
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}