import User from "@/models/userModel";
import { connect } from "@/config/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect()

export async function POST (request: NextRequest){
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody
        console.log(reqBody);
        // check user exits
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        } 
        console.log('user exists', user)
        // check if password is correct
        const validPass = await bcryptjs.compare(password, user.password)
        if(!validPass){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }
        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_TOKEN!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token,{httpOnly: true}) 
        return response } 
        catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}