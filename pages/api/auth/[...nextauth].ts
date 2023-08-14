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
          if (response.ok) {
            return { ...response.data.user, token: response.data.token };
          } else {
            throw new Error(
              response?.data?.message || "Something wrong with next auth."
            );
          }
        } catch (error: any) {
          let errorMessage = "An error occurred while processing your request.";

          if (error?.message) {
            errorMessage = error?.message;
          }

          throw new Error(errorMessage);
        }
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
