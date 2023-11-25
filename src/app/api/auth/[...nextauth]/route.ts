import axios from "axios";
import { callback } from "chart.js/helpers";
import NextAuth, { NextAuthOptions } from "next-auth";
import { AdapterAccount } from "next-auth/adapters";
import {} from "next-auth/middleware";
import GoogleProvider from "next-auth/providers/google";
import { useState } from "react";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user) {
      try {
        const res = await axios
          .get(`${process.env.API_URL}/users/?email=${user.user.email}`)
          .then((res) => res.data);
      } catch (error) {
        await axios
          .post(`${process.env.API_URL}/users`, {
            name: user.profile?.name,
            email: user.profile?.email,
            password: "somepassword",
          })
          .then((res) => {});
      }

      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
