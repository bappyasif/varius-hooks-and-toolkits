import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";

// to sign in use this url in browser "localhost:3000/api/auth/signin", after that a session cookie will be stored in browser
// to sign out use this url in browser "localhost:3000/api/auth/signout", after that session cookie will be removed

// currently there's built in ui for both "log in" and "log out" urls by default
// after both sign in and sign out we are redirected to home page by default as we have configured it in github app settings for oauth
export default NextAuth({
    providers: [
        // after successfull login there will be a sission cookie will be stored, and which in turn will be sent with every subsequent requests
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
        // in older version
        // Providers.GitHub({
            // clientId: process.env.GITHUB_CLIENT_ID,
            // clientSecret: process.env.GITHUB_CLIENT_SECRET
        // })
    ],

    // lets also include our db, so that nextjs can automatically track session data in there as well
    // all we have to do is simply point to DB string that we addedin env file
    // database: process.env.DB_URL, // this is not available in new version, part of legacy version

    adapter: MongoDBAdapter(clientPromise),
    // even though only through database tracking is enough for session, but keeping a session tracker with jwt is also very useful
    // session: {jwt: true}, // legacy code, and changed in current version
    session: {strategy: "jwt"},
    // when we specify jwt to true we then also need to specify a secret
    jwt: {
        secret: process.env.JWT_SECRET
    },

    // we also at times need some session specific data into our user session data for any "custom checks"
    // for this purpose we will have to make use of "callbacks", which will check if our user is valid or not and then extract it "unique id" from session object and add it to token and return it to catch all auth route
    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.id = user.id
            }
            return token
        },
        // even though we are returning id into session callback but we wont see that in session object in browser, to do just so that we wil use "session callbacks"
        // this function will take two parameters session and token from "jwt callbacks"
        async session({session, token}) {
            // we simply extract user id from token and add it to session object
            session.user.id = token.id
            return session
        }
    }
})