import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from "@/models/userModels"

export const sendEmail = async ({email, emailType, userId}: {email: string, emailType: string, userId: string}) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType=="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }
        else if(emailType=="RESET"){
                await User.findByIdAndUpdate(userId,{
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });

         const mailOptions = {
            from : 'mrkkecom@gmail.com',
            to:email,
            subject:emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
         }             

         const mailResponse = await transport.sendMail(mailOptions)
         return mailResponse

    } catch (error:any) {
        throw new Error(error.message);
    }   
}
