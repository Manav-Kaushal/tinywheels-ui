import { api } from "@src/services/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload: any = {
          email: credentials!.email,
          password: credentials!.password,
        };
        try {
          const res: any = await api.login(JSON.stringify(payload));
          if (res.kind === "ok") {
            return { ...res.data.user, token: res.data.token };
          } else {
            throw new Error(
              res?.data?.message || "Something wrong with next auth."
            );
          }
        } catch (error: any) {}
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      user && (token.user = user);
      return token;
    },
    session: ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
