import {connect} from "@/dbConfig/dbConfig";
import Staff from "@/models/staffModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {phone, password} = reqBody;
        console.log(reqBody);

        // Check if staff exists
        const staff = await Staff.findOne({phone})
        if (!staff) {
            return NextResponse.json({error: 'Staff does not exist'}, {status: 400})
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, staff.password)
        if (!validPassword) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400})
        }

        const userType = staff.userType

        // Create token data
        const tokenData = {
            id: staff._id,
        }

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
        
        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        })
        response.cookies.set('token', token, {
            httpOnly: true,
        })
        // if (userType === 'admin') {
        //     response.cookies.set('isAdmin', 'true', {
        //         httpOnly: true,
        //     })
        // }
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}