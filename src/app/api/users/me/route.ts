import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModels";
import { NextRequest , NextResponse} from "next/server";


connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req)
        console.log(userId);
        const user = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({
            message:"user found",
            data:user
        })
    } catch (error:any) {
           return NextResponse.json({error:error.message},{status:400})
    }
}