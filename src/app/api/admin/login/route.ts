import {connect} from "@/dbConfig/dbConfig";
import Admin from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        // Check if admin exists
        const admin = await Admin.findOne({email})
        if (!admin) {
            return NextResponse.json({error: 'Admin does not exist'}, {status: 400})
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, admin.password)
        if (!validPassword) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400})
        }

        const userType = admin.userType

        // Create token data
        const tokenData = {
            id: admin._id,
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

        // store user data in local storage
        const user = {
            id: admin._id,
            phone: admin.phone,
            role: admin.role,
            userType: admin.userType,
        }
        response.cookies.set('user', JSON.stringify(user), {
            httpOnly: false,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}