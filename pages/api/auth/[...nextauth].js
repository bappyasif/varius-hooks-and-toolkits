import { secrets } from "@/secrets";
import NextAuth from "next-auth/next";
import GitHubProviders from "next-auth/providers/github"

export default NextAuth({
    providers: [
        GitHubProviders({
            clientId: secrets.GITHUB_CLIENT_ID,
            clientSecret: secrets.GITHUB_CLIENT_SECRET
        })
    ]
})