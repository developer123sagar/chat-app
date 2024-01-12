import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";
import Message from "@/model/messageModel";
import User from "@/model/userModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        if (!userId) {
            cookies().set('token', '', { maxAge: 0 })
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }
        const reqBody = await req.json();

        const { message, to } = reqBody;

        if (message && to && userId != to) {
            const recipient = await User.findById(to);

            if (!recipient) {
                return NextResponse.json({ message: "Recipient does not exist" }, { status: 404 });
            }

            // Create a new message instance
            const newMessage = new Message({
                senderId: userId,
                receiverId: to,
                message: message,
            });
            console.log(newMessage)

            // Save the message to the database
            await newMessage.save();

            return NextResponse.json({
                message: "Message sent successfully",
                data: {
                    message: newMessage.message,
                    messageStatus: newMessage.messageStatus,
                },
            });
        }
        return NextResponse.json({ message: "Incomplete data" }, { status: 400 });

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 })

    }

}