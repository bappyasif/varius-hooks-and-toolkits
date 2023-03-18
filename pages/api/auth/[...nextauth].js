import { secrets } from "@/secrets";
import NextAuth from "next-auth/next";
import GitHubProviders from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
        GitHubProviders({
            clientId: secrets.GITHUB_CLIENT_ID,
            clientSecret: secrets.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: secrets.GOOGLE_CLIENT_ID,
            clientSecret: secrets.GOOGLE_CLIENT_SECRET
        })
    ]
})