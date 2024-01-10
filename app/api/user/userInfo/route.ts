
import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/getTokenData";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(req: NextRequest) {

    try {
        const userId = await getTokenData(req);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }
        console.log(userId)

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
