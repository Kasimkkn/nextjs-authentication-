import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModels"
import {NextResponse , NextRequest} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare(password , user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid credentials"}, {status: 400})
        }

        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
            expiresIn: '1d'
        })

        user.verifyToken = token;
        user.verifyTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        
        const response = NextResponse.json({
            success: true,
            message:"Login successful",
        })
        response.cookies.set("token", token,{
            httpOnly:true
        });

        return response

    } catch (error : any) {
        console.log(error);
        return NextResponse.json({
            error: 'An error occurred while processing your request.'+ error.message,
            status: 500
        });
    }
}