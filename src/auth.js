import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        // Log inputs for debugging
        console.log("Authorization attempt:", email, password);
      
        // Simplified logic for testing
        if (password !== "passcode") {
          throw new CredentialsSignin({
            message: "Invalid credentials provided",
            cause: { err: new Error("Incorrect password") },
          });
        }
      
        // Return a dummy user object for testing
        return { email, id: "dummy-id" };
      },
      
    }),
  ],
});
