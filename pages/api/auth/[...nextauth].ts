import api from "@utils/api";
import { getLoginUrl } from "@utils/endPoints";
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
          const response: any = await api.post(
            getLoginUrl(),
            JSON.stringify(payload),
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );
          return { ...response.data.user, token: response.data.token };
        } catch (error: any) {
          throw new Error(
            error?.response?.data?.message || "Something went wrong"
          );
        }
      },
    }),
  ],
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
