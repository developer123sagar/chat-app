import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";
import Message from "@/model/messageModel";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }
        const reqBody = await req.json();

        const { message, from, to } = reqBody;
        if (message && from && to) {
            const recipient = await User.findById(to);
            console.log(recipient)


            // Create a new message instance
            const newMessage = new Message({
                senderId: from,
                receiverId: to,
                message: message,
            });

            // Save the message to the database
            await newMessage.save();

            return NextResponse.json({
                message: "Message sent successfully",
                data: newMessage,
            });
        }
        return NextResponse.json({ message: "Incomplete data" }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })

    }

}