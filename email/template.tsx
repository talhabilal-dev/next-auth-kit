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
      ? `${process.env.DOMAIN}/user/verify-token?token=${token}&type=email`
      : `${process.env.DOMAIN}/user/reset-password/verify?token=${token}&type=reset-password`;

  return (
    <div>
      <h2>{Subject}</h2>
      <p>Click the link below:</p>
      <a href={actionUrl}>{actionUrl}</a>
    </div>
  );
}
