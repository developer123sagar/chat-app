import User from '@/model/userModel';
import nodemailer from 'nodemailer';
import { generateUniqueRandomString } from '@/helper/generateString';
import { ISendMail } from '@/types';

const email = process.env.EMAIL || ""
const pass = process.env.EMAIL_PASS || "";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass
    }
});

export const sendEmail = async ({ email, emailType }: ISendMail) => {
    try {
        // creating hashed token
        const randomString = generateUniqueRandomString(30)
        const tokenExpiry = Date.now() + 300000;

        if (emailType === "USER_VERIFICATION_EMAIL") {
            await User.findOneAndUpdate({ email }, {
                verifyToken: randomString,
                verifyTokenExpiry: tokenExpiry,
            });
        }

        if (emailType === "FORGOT_PASSWORD") {
            await User.findOneAndUpdate({ email }, {
                forgotPasswordToken: randomString,
                forgotPasswordTokenExpiry: tokenExpiry,
            });
        }

        const mailOptions = {
            from: 'chat.jiffy@gmail.com',
            to: email,
            subject: emailType === "USER_VERIFICATION_EMAIL" ? "Verify your account" : "Reset your password",
            html: `<p>Click <a href=https://jiffychat.vercel.app/${emailType === "FORGOT_PASSWORD" ? "forgotpassword/resetpassword" : "verifyemail"}?${emailType === "USER_VERIFICATION_EMAIL" ? "token" : "forgotToken"}=${randomString}>here</a> to ${emailType === "USER_VERIFICATION_EMAIL" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN_URL}/${emailType === "FORGOT_PASSWORD" ? "forgotpassword/resetpassword" : "verifyemail"}?${emailType === "USER_VERIFICATION_EMAIL" ? "token" : "forgotToken"}=${randomString}
            </p>`
        }

        const mailResponse = await transporter.sendMail({
            ...mailOptions,
            text: "JiffyChat"
        });
        return mailResponse;
    } catch (err: any) {
        throw new Error(err.message);
    }
};
