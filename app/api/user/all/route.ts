import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { groupUsersByInitialLetters } from "@/helper/backend/groupUserByInitialLetters";
import { getTokenData } from "@/helper/getTokenData";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getTokenData(req);
        
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        const users = await User.find({}, '_id email username').sort({ username: 1 });

        if (!users || users.length === 0) {
            return NextResponse.json({ message: "No users found" }, { status: 404 });
        }

        // Group users by initial letters
        const groupedUsers = groupUsersByInitialLetters(users);

        return NextResponse.json({
            message: "Users found",
            data: groupedUsers
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}