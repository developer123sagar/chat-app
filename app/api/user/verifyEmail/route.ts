import { connect } from "@/config/mongo.config";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { token } = reqBody

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: "Your token is expired" }, { status: 400 })
        }

        user.isVerified = true,
            user.verifyToken = undefined,
            user.verifyTokenExpiry = undefined

        await user.save()
        return NextResponse.json({
            message: "Email is verified successfully",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}