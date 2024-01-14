import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";
import Message from "@/model/messageModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        const { pathname } = new URL(req.url);
        const to = pathname.split('/').pop();

        if (!userId) {
            cookies().set('token', '', { maxAge: 0 })
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        if (to && userId != to) {
            const messages = await Message.find({
                $or: [
                    { senderId: userId, receiverId: to },
                    { senderId: to, receiverId: userId },
                ],
            }).sort({ _id: 1 });

            const unreadMessages: string[] = [];
            messages.forEach((msg, id) => {
                if (msg.messageStatus !== "SEEN" && msg.senderId == to) {
                    messages[id].messageStatus = "SEEN";
                    unreadMessages.push(msg._id);
                }
            });

            // updating msg status in message model
            await Message.updateMany(
                { _id: { $in: unreadMessages } },
                { $set: { messageStatus: "SEEN" } }
            );

            return NextResponse.json({
                message: "Messages retrieved successfully",
                data: messages,
            });
        }
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}