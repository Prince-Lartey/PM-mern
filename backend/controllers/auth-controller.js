import bcrypt from "bcrypt";
import User from "../models/user.js";
import Verification from "../models/verification.js";
import jwt from "jsonwebtoken";
import sendEmail from "../libs/send-mail.js";

const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email address already in use",
            });
        }

        const user = {
            name: name,
            email: email,
        }

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashPassword,
            name,
        });

        const verificationToken = jwt.sign(
            { userId: newUser._id, purpose: "email-verification" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        await Verification.create({
            userId: newUser._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
        });

        // send email
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
        const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;
        const emailSubject = "Verify your email";

       await sendEmail(
            {
                email: user.email,
                subject: "Verify your email",
                html: emailBody,
                isHtml: true,
            }
        );

        // if (!isEmailSent) {
        //     return res.status(500).json({
        //         message: "Failed to send verification email",
        //     });
        // }

        res.status(201).json({
            message: "Verification email sent to your email. Please check and verify your account.",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {

}

export { registerUser, loginUser };