import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import Message from "@/model/messageModel";
import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";

connect()

export async function DELETE(req: NextRequest) {
    try {
        // Get the userId from the token
        const userId = await getTokenData(req);

        // Extract receiverId from the URL
        const { pathname } = new URL(req.url);
        const to = pathname.split('/').pop();

        // Check if the user is authorized
        if (!userId) {
            cookies().set('token', '', { maxAge: 0 })
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        // Check if receiverId is provided and not equal to the userId
        if (to && userId != to) {
            // Delete all messages between the sender and receiver
            await Message.deleteMany({
                $or: [
                    { senderId: userId, receiverId: to },
                    { senderId: to, receiverId: userId },
                ],
            });

            return NextResponse.json({
                message: `Messages deleted successfully`,
                success: true,
            }, { status: 200 });
        }

        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}