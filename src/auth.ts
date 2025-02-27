import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
import Prisma from "./lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from 'next-auth';

export const auth: NextAuthOptions = {
  adapter: PrismaAdapter(Prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        const email = credentials.email;
        const password = credentials.password;

        try {
          const user = await Prisma.user.findUnique({
            where: { email: email },
            select:{ id:true, name: true, email: true, role: true, password: true }
          });

          if (!user) {
            console.log("No user found");
            throw { error: "No user found", status: 402 };
          }

          const isMatched = await compare(password, user.password);
          console.log(isMatched);
          if (!isMatched) {
            throw { error: "Password Incorect!", status: 404 };
          }

          const userData = {
            id:   user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        
          return userData;
        } catch (error:any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
};
