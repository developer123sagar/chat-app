import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/backend/mailer";

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { email } = reqBody

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        // check if user verified
        if (!user.isVerified) {
            return NextResponse.json({ error: "Sorry your email is not verified yet!" }, { status: 400 })
        }

        // send paasword reset link to email to the user
        await sendEmail({ email, emailType: "FORGOT_PASSWORD" })

        return NextResponse.json({
            message: "A new password reset link is sent to your email",
            success: true,
        })


    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });

    }
}