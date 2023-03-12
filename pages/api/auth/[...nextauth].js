import { secrets } from "@/secrets";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: secrets.GITHUB_CLIENT_ID,
            clientSecret: secrets.GITHUB_CLIENT_SECRET
        })
    ]
})