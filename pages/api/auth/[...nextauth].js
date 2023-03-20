import NextAuth from "next-auth/next";
import GitHubProviders from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GitHubProviders({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
})