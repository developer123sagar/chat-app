import User from "@/model/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/config/mongo.config";
import { NextRequest, NextResponse } from "next/server";

connect()

const expiresIn = 30 * 24 * 60 * 60;

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody

        // check user exits
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        // check if password is correct
        const validPass = await bcryptjs.compare(password, user.password)
        if (!validPass) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        // check if user verified
        if (!user.isVerified) {
            return NextResponse.json({ error: "A verification link is sent to your email. Please verify your email" }, { status: 400 })
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        }

        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, { expiresIn })
        user.token = token
        await user.save()

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        }, { status: 200 })
        
        response.cookies.set("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + expiresIn * 1000)
        })
        return response
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}