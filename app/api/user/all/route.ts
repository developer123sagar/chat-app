import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { groupUsersByInitialLetters } from "@/helper/backend/groupUserByInitialLetters";
import { getTokenData } from "@/helper/backend/getTokenData";
import { cookies } from "next/headers";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        if (!userId) {
            cookies().set('token', '', { maxAge: 0 })
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        const users = await User.find({}, {}).sort({ username: 1 });

        console.log(userId)

        if (!users || users.length === 0) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }

        // filtering verified users only
        const verifiedUsers = users.filter(user => user.isVerified === true && user._id != userId);

        // Group users by initial letters
        const groupedUsers = groupUsersByInitialLetters(verifiedUsers);

        return NextResponse.json({
            message: "Users found",
            data: groupedUsers
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}