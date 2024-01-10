import User from "@/model/userModel";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getTokenData = async (req?: NextRequest) => {
    if (req)
        try {
            const token = req.cookies.get("token")?.value || '';
            console.log(token)

            const isTokenValid = await User.findOne({ token: token })
            console.log(isTokenValid)

            const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);
            console.log(decodedToken)
            if (isTokenValid === null) {
                return null
            }
            if (decodedToken && isTokenValid)
                return decodedToken.id;
        } catch (error: any) {
            console.log(error)
        }

}