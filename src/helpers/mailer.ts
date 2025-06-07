import { Resend } from "resend";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import EmailTemplate from "../../email/template";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      from: "Acme <no-reply@talhabilal.dev>",
      to: Email,
      subject: `${EmailType} - ${subject}`,
      react: EmailTemplate({
        emailType: EmailType,
        Subject: subject,
        token: hashedUserId,
      }),
    });

    if (error as any) {
      console.error("Error sending email:", error);
      throw new Error(error as any);
    }
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to send email" + error.message);
  }
};
