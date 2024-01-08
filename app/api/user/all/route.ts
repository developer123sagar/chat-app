import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { NextResponse } from "next/server";
import { groupUsersByInitialLetters } from "@/helper/backend/groupUserByInitialLetters";

connect();

export async function GET() {
    try {
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