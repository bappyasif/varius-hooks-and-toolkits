import NextAuth from "next-auth/next";
import GithubProviders from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export default NextAuth({
    providers: [
        GithubProviders({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    session: {strategy: "jwt"},
    jwt: {
        secret: process.env.JWT_SECRET
    },
    // we would sometimes need special and unique identifier to cross checks our session user and perform certain tasks, which from default session data might not be enough
    // for those kinds of custom session data we use callbacks and simply add needed information into jwt token
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id
            }
            return token
        },

        // now we need to add that unique token and then add it to session user object so that we can use for further use specific to user
        async session({session, token}) {
            session.user.id = token.id
            return session
        }
    }
})