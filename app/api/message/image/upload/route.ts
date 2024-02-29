import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import Message from "@/model/messageModel";
import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";
import { uploadImage } from "@/utils/cloudinary";

connect()

export async function POST(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        if (!userId) {
            cookies().set('token', '', { maxAge: 0 });
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        const formdata = await req.formData();
        const image = formdata.get("image") as File;
        const receiverId = formdata.get("receiver")

        if (!image) {
            return NextResponse.json({ error: "no image found", success: false }, { status: 401 });
        }
        const sender = await User.findOne({ _id: userId });
        
        if (!receiverId) {
            return NextResponse.json({ error: "Reciever is not found", success: false }, { status: 404 })
        }

        const data: any = await uploadImage(image, `image/${sender.username}`)
        
        if (userId != receiverId) {
            const newMessage = new Message({
                senderId: userId,
                receiverId: receiverId,
                message: data?.secure_url,
                messageType: "image",
                imagePubliId: data?.public_id,
            })
            await newMessage.save();

            return NextResponse.json({
                message: "Image Uploaded successfully",
                data: {
                    message: newMessage.message,
                    messageStatus: newMessage.messageStatus,
                },
            });
        }
        return NextResponse.json({ message: "Incomplete data" }, { status: 400 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
