import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

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
    ]
})