import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModels"
import {NextResponse , NextRequest} from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username ,email , password} = reqBody;

        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({
                error:'user already exists',
                status:400
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password , salt)

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save();

        await sendEmail({email, emailType:'VERIFY', userId: savedUser._id})

        return NextResponse.json({
            message : 'user created successfully',
            success : true,
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: 'An error occurred while processing your request.',
            status: 500
        });
    }
}