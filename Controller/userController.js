import User from "../Models/userSchema.js";
import bcrypt from "bcryptjs"
import transporter from "../Services/Nodemailer.js";
import jwt from "jsonwebtoken" //JWT token link using time only.

//Registration for User
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        //Validation
        if (!firstName ) {
            return res.status(400).json({ message: "Register Failed! Please provide firstName" })
        }
        if (!lastName ) {
            return res.status(400).json({ message: "Register Failed! Please provide lastName" })
        }
        if (!email ) {
            return res.status(400).json({ message: "Register Failed! Please provide email" })
        }
        if ( !password) {
            return res.status(400).json({ message: "Register Failed! Please provide password" })
        }
        
        //Check user already exists
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({ message: `User with same Email Id : ${email} alraedy exists. Please try again with different email id.` })
        }

        //Encrypt password
        const hashpassword = await bcrypt.hash(password, 10)

        //Create new user
        const newUser = new User({ firstName, lastName, email, password: hashpassword })
        await newUser.save()
        res.status(200).json({ message: "User Registered Successfully!", result: newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Registration Failed Internal server error" })
    }
}

//Login for User
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Plese provide email and password" })
        }

        //Check user already exists
        const userDetail = await User.findOne({ email })
        if (!userDetail) {
            return res.status(401).json({ message: "User Not Found" })
        }
        //Compare password
        const passwordMatch = await bcrypt.compare(password, userDetail.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" })
        }
        res.status(200).json({ message: "User Logged In Successfully!", result: userDetail })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Login Failed Internal server error" })
    }
}

//Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "Email is required" })
        }
        //Check if the User exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email Not Found" })
        }

        //Generate Reset Tken
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); 
        await user.save();

        //Send Email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${token}`

        const mailOption = {
            from: process.env.NODEMAILER_MAIL,
            to: user.email,
            subject: "Reset Your Password",
            html: `<P>Hi ${user.username}</P>
                <p>You requested to reset your password. Please use the following link to set a new password:</p><a href="${resetLink}">${resetLink}</a>
                <p>It will expire within 1 hour</p>
                <p><i>Please don't reply to this email</i></p>
                <p>If you did not make this request, Please ignore this email.</p>
                <p>Thank you</p>`
        }

        // Attempt to send email
        try {
            await transporter.sendMail(mailOption);
            res.status(200).json({ message: "Password reset link sent successfully!" });
        } catch (mailError) {
            console.error("Error sending email:", mailError);
            res.status(500).json({ message: "Failed to send password reset email" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Forgot Password Failed: Internal server error" })
    }
}

//Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { newPassword } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Invalid or missing id" });
        }
        if (!token) {
            return res.status(400).json({ message: "Invalid or missing token" });
        }
        if (!newPassword) {
            return res.status(400).json({ message: "Password is required" })
        }

        // Verify Token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({ message: "Token expired" });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({ message: "Invalid token" });
            }
            return res.status(500).json({ message: "Token verification failed" });
        }

        //Find user
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(400).json({ message: "Invalid , expired token or user does not exist" });
        }

        //Hash new password
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;    //Clear the reset token
        user.resetPasswordExpires = undefined;  //Clear the expiration
        await user.save();

        // Send success notification email
        const successMailOption = {
            from: process.env.NODEMAILER_MAIL,
            to: user.email,
            subject: "Password Reset Successful",
            html: `<P>Hi ${user.username},</P>
                <p>Your password has been reset successfully.</p>
                <p>If you did not initiate this change, please contact our support immediately.</p>
                <p>Thank you</p>`
        };

        try {
            await transporter.sendMail(successMailOption);
            res.status(200).json({ message: "Password has been reset successfully and a confirmation email has been sent" });
        } catch (mailError) {
            console.error("Error sending confirmation email:", mailError);
            res.status(500).json({ message: "Password reset was successful, but failed to send confirmation email." });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Reset Passowrd Failed - Internal server error" })
    }
}