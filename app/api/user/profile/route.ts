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
        console.log(formdata)
        const avatar = formdata.get("avatar") as File;
        const displayName = formdata.get("displayName");
        const about = formdata.get("about");
        const gender = formdata.get("gender");

        const user = await User.findOne({ _id: userId });

        const updateFields: any = {};

        if (displayName !== null) {
            updateFields.displayName = displayName;
        }

        if (about !== null) {
            updateFields.about = about;
        }

        if (gender !== null) {
            updateFields.gender = gender;
        }

        if (avatar || avatar !== null) {
            const data: any = await uploadImage(avatar, `image/${user.username}`);
            console.log(data.secure_url)
            updateFields.avatar = data.secure_url;
        }
        console.log(updateFields)

        await User.updateOne({ _id: userId }, { $set: updateFields });

        return NextResponse.json({ success: true, message: "User fields updated successfully" }, { status: 200 });
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
