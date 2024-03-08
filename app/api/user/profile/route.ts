import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";
import { uploadImage } from "@/utils/cloudinary";

connect();

export async function POST(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        if (!userId) {
            cookies().set('token', '', { maxAge: 0 });
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        const formdata = await req.formData();
        const avatar = formdata.get("avatar") as File;
        const displayName = formdata.get("displayName");
        const about = formdata.get("about");

        const user = await User.findOne({ _id: userId });
        const updateFields: any = {};

        if (displayName !== null && displayName != user.displayName) {
            updateFields.displayName = displayName;
        }

        if (about !== null && about != user.about) {
            updateFields.about = about;
        }

        if (avatar !== null && avatar != user.avatar) {
            const data: any = await uploadImage(avatar, `image/${user.username}`);
            updateFields.avatar = data.secure_url;
        }

        if (Object.keys(updateFields).length > 0) {
            await User.updateOne({ _id: userId }, { $set: updateFields });
            if (!user.isProfileUpdated) {
                user.isProfileUpdated = true;
                await user.save()
            }
        }

        return NextResponse.json({ success: true, message: "User fields updated successfully", data: updateFields }, { status: 200 });
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
