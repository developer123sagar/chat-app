import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

import User from "@/model/userModel";

export const getTokenData = async (req?: NextRequest) => {
    if (req)
        try {
            const token = req.cookies.get("token")?.value || '';

            const isTokenValid = await User.findOne({ token: token })

            const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);
            if (isTokenValid === null) {
                return null
            }
            if (decodedToken && isTokenValid)
                return decodedToken.id;
        } catch (error: any) {
            console.log(error)
        }

}