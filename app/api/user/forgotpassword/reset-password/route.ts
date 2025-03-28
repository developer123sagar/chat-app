import bcryptjs from "bcryptjs"

import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { token, newpassword } = reqBody

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: "Your token is expired" }, { status: 400 })
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newpassword, salt)


        user.forgotPasswordToken = undefined,
        user.forgotPasswordTokenExpiry = undefined
        user.password = hashedPassword

        await user.save()

        return NextResponse.json({
            message: "Your password is changed successfully!",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}