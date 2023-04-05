import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb";

export const authOptions = ({
    providers: [
        GithubProvider(
            {
                // profile: profile => {
                //     return {role: profile?.role ? "user" : "not a user"}
                // },
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET
            }
        )
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "jwt" },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account?.access_token
                token.id = profile?.id
                // token.role = profile?.role
            }
            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token?.accessToken
            session.user.id = token.id
            // session.user.role = user?.role
            return session
        }
    },
});

export default NextAuth(authOptions);