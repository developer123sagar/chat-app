import bcryptjs from "bcryptjs"
import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";

// connecting to mongo db
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody

        // hashing password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            if (user.verifyTokenExpiry < Date.now()) {
                user.username = username;
                user.password = hashedPassword
                await user.save();
                await sendEmail({ email, emailType: "USER_VERIFICATION_EMAIL" })
                return NextResponse.json({ message: "A new verification link is sent to your email. Please verify your account", status: 201 })
            } else {
                return NextResponse.json({ error: 'User already exists' }, { status: 400 })
            }
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            token: "",
        })
        await newUser.save()

        // send verificaton link email to new user
        await sendEmail({ email, emailType: "USER_VERIFICATION_EMAIL" })

        return NextResponse.json({
            message: "A verification link is sent to your email. Please verify your account",
            success: true,
        })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}