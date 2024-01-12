
import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        if (!userId) {
            cookies().set('token', '', { maxAge: 0 })
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }
        const user = await User.findOne({ _id: userId }).select("-password -token -role");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
