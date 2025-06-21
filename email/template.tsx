import React from "react";

export default function EmailTemplate({
  emailType,
  Subject,
  token,
}: {
  emailType: string;
  Subject: string;
  token: string;
}) {
  const actionUrl =
    emailType === "VERIFY"
      ? `${process.env.NEXT_PUBLIC_APP_URL}/user/verify-token?token=${token}&type=email`
      : `${process.env.NEXT_PUBLIC_APP_URL}/user/reset-password/verify?token=${token}&type=reset-password`;

  return (
    <div>
      <h2>{Subject}</h2>
      <p>Click the link below:</p>
      <a href={actionUrl}>{actionUrl}</a>
    </div>
  );
}
