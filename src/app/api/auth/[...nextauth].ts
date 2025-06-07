import NextAuth from "next-auth";


export default NextAuth({
    providers: [
        // Add your authentication providers here
        // Example:
        // Providers.Google({
        //   clientId: process.env.GOOGLE_CLIENT_ID,
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
    ],
  callbacks: {
    session({ session, token, user }) {
      return session;
    },
  },
});
