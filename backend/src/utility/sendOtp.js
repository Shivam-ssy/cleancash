import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER, // Your email
                pass: process.env.EMAIL_PASS, // Your email password or App Password
            },
        });

        const emailTemplate = `
            <html>
            <body>
                <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px;">
                    <h2>OTP Verification</h2>
                    <p>Use the following OTP to verify your account:</p>
                    <h1 style="color: #007bff;">${otp}</h1>
                    <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
            </body>
            </html>
        `;

        await transporter.sendMail({
            from: `"CleanCash" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: emailTemplate,
        });

        console.log("OTP email sent successfully");
    } catch (error) {
        console.error("Error sending OTP email:", error);
    }
};
