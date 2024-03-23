import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : [true,"enter the username"]
    },
    email:{
        type:String,
        required : [true,"enter the email"]
    },
    password:{
        type:String,
        required : [true,"enter the password"]
    },
    isAdmin:{
        type:Boolean,
        default : false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})

const User = mongoose.models.users || mongoose.model("users" , userSchema);

export default User;