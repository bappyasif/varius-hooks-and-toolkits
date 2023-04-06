import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
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
        ),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "john smith", required: true},
                email: {label: "Email", type: "email", placeholder: "john@smith.com", required: true},
                password: {label: "Password", type: "password", placeholder: "*********", required: true, minlength: 4}
            },
            async authorize(credentials, req) {
                const {username, email, password} = credentials;
                // console.log(username, email, password)
                const user = {name: username, email, password, id: Date.now()}

                if(user && username && email && password) {
                    return user
                } else {
                    return null
                }
            }
        })
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
            } else {
                // this will be used when usaer is logged in using "Email and password"
                token.accessToken = token?.jti
                token.id = token.sub
            }
            // console.log(token, account, profile, "JWT CB!!")
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