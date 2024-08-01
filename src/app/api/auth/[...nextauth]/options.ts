import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connect();
        try {
          const user = await User.findOne({
            phone: credentials.phone,
          });

          if (!user) {
            throw new Error("No user found");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Password is incorrect");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = "" + user._id;
        token.f_name = user.f_name;
        token.l_name = user.l_name;
        token.role = user.role;
        token.phone = user.phone;
        token.avatar = user.avatar;
        token.isVerified = user.isVerified;
        token.college_id = "" + user.college_id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.f_name = token.f_name;
        session.user.l_name = token.l_name;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.isVerified = token.isVerified;
        session.user.avatar = token.avatar;
        
        session.user.college_id = token.college_id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.TOKEN_SECRET,
};
