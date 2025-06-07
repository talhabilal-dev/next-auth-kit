export default function EmailTemplate({
  emailType,
  Subject,
  token
}: {
  emailType: string;
  Subject: string;
  token?: string;
}) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Hello Mate,
        <br />
        {Subject}
      </h2>
      <p className="mb-6">
        {emailType === "VERIFY"
          ? "Click the link below to verify your email"
          : "Click the link below to reset your password"}
      </p>
      <a
        href={
          emailType === "VERIFY"
            ? `${process.env.DOMAIN}/api/users/verify?token=${token}`
            : `${process.env.DOMAIN}/api/users/reset-password?token=${token}`
        }
        target="_blank"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
      </a>
    </div>
  );
}
