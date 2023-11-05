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

        // check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            token: "",
        })
        await newUser.save()

        // send verificaton link email to user
        await sendEmail({ email, emailType: "USER_VERIFICATION_EMAIL" })

        return NextResponse.json({
            message: "User is Created successfully",
            success: true,
        })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}