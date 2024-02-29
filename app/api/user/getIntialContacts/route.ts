import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// import User from "@/model/userModel";
import { connect } from "@/config/mongo.config";
import { getTokenData } from "@/helper/backend/getTokenData";

connect()

export async function GET(req: NextRequest) {
    try {
        const userId = await getTokenData(req);

        if (!userId) {
            cookies().set('token', '', { maxAge: 0 })
            return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
        }

        // const user = await User.findOne({
        //     $where: { _id: userId},
        //     $in:{

        //     }
        // })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })

    }

}