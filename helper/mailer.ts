import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

interface ISendMail {
    email: string,
    emailType: "USER_VERIFICATION_EMAIL" | "FORGOT_PASSWORD",
}

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

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: 'jiffychat@gmail.com',
            to: email,
            subject: emailType === "USER_VERIFICATION_EMAIL" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "USER_VERIFICATION_EMAIL" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN_URL}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (err: any) {
        throw new Error(err.message);
    }
};
