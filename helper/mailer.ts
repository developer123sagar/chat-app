import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

interface ISendMail {
    email: string,
    emailType: "USER_VERIFICATION_EMAIL" | "FORGOT_PASSWORD",
}

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
        const hashedToken = await bcryptjs.hash(email, 10);
        const tokenExpiry = Date.now() + 300000;

        if (emailType === "USER_VERIFICATION_EMAIL") {
            await User.findOneAndUpdate({ email }, {
                verifyToken: hashedToken,
                verifyTokenExpiry: tokenExpiry
            });
        }
        const mailOptions = {
            from: 'jiffychat@gmail.com',
            to: email,
            subject: emailType === "USER_VERIFICATION_EMAIL" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "USER_VERIFICATION_EMAIL" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN_URL}/verifyemail?token=${hashedToken}
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
