// lib/email/template.tsx
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
      ? `${process.env.DOMAIN}/api/users/user-verify?token=${token}`
      : `${process.env.DOMAIN}/api/users/reset-password?token=${token}`;

  return (
    <div>
      <h2>{Subject}</h2>
      <p>Click the link below:</p>
      <a href={actionUrl}>{actionUrl}</a>
    </div>
  );
}
