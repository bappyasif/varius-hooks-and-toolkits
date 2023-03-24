import { getSession, useSession } from 'next-auth/react'
import React from 'react'

const BlogsPage = ({ data }) => {
    const {data: session} = useSession()
    // there wont be any delay for getting hold of Session related data as we already have passed it to our "SessionProvider" from Server Side (i.e. getServerSideProps)
    return (
        <div>BlogsPage -- Dear {session?.user.name || "User"} -- {data}</div>
    )
}

/**
 * 
 * as this function gets to run before page is rendered so its a good idea to pass session information to page so that any "session" related data can be rendered without have to "refetch" and delay
 * to do this we need to make sure our "SessionProvider" in "_app.js" is getting a "session" prop which value is set to "pageProps.session", as we will be passing "session" as a prop to page
 * 
 * as we are passing session from server side we can access this "session" from any component without have to "destructure" it in components
 */
export const getServerSideProps = async context => {
    // for server side authentication, session hook we also need to pass in context as a parameter to it so that it can get necessary information required for completeing this hook call
    const session = await getSession(context);

    // for securing page server side, we can redirect user to login page with a callback url
    if(!session) {
        return {
            redirect: {
                destination: "/api/auth/signin?callbackUrl=http://localhost:3000/blogs",
                parmanent: false
            }
        }
    }

    return {
        props: {
            session,
            data: session ? "Personlaized blogs" : "Free blogs"
        }
    }
}

export default BlogsPage