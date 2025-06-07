import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
export const sendEmail = async (
  EmailType: string,
  subject: string,
  Email: string,
  userId: string
) => {
  if (!EmailType || !subject || !Email || !userId) {
    throw new Error("All parameters are required");
  }

  try {
    const hashedUserId = await bcrypt.hash(userId, 10);
    if (EmailType === "VERIFY") {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      user.verificationToken = hashedUserId;
      user.verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save();
    } else if (EmailType === "FORGOT_PASSWORD") {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      user.forgetToken = hashedUserId;
      user.forgetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      await user.save();
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `${process.env.APP_NAME || "No Reply"} <${process.env.EMAIL_FROM}>`,
      to: Email,
      subject: `${EmailType} - ${subject}`,
      html: `<p>Click <a href="http://localhost:3000/verify/${userId}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error("Failed to send email" + error.message);
  }
};
