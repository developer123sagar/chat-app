import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getTokenData = (req?: NextRequest) => {
    if (req)
        try {
            const token = req.cookies.get("token")?.value || '';
            const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);
            if (decodedToken)
                return decodedToken.id;
        } catch (error: any) {
            console.log(error)
        }

}