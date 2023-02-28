import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

// as index.js always maps to root doimain, so will it do for nested routes folder as well
// doing so we dont have to keep nested routes base domain outside of this nested folder
// by renaming this as index.js will map to this Blog folder main route
function Blog({data}) {
  // as useSession hook by default checks with SessionProvider context so its not necessary to get userSession data from getServerSide provided props destructuring (i.e. {data, session})
  // also its safer to use useSession hook to use for accessing session data instead of props de-structuring

  // we also dont need "status" as in server side rendering "status" will always be "authenticated"
  // let {data:session, status} = useSession();
  // console.log(session, "!session - status!", status)

  let {data:session} = useSession();
  console.log(session, "!session!")

  // as "session" data is sent back to components for this route component, on reload session data will persist
  // but for other routes, if session data is not being sent then "flicker" effect for "conditional menu item rendering" will still persist as app will fetch user session data for those "route pages"
  return (
    <>
      <Link href={"/"}>Home</Link>
      <div>Blog page</div>
      <h1>{data}</h1>
    </>
  )
}

// server side user authentication using getSession hook from nextjs
export const getServerSideProps = async context => {
  // difference between client side and server side getSession is that in server side we also need to pass in information about "request"
  // we simply pass in context to getSession function to handle information required by nextjs for session fetching
  const userSession = await getSession(context)

  // lets secure this server side page by ensuring that if user is not logged in then make them sign in and then redirect back to this page after successfull login
  if(!userSession) {
    return {
      redirect: {
        // destination: "/api/auth/signin?callbackUrl=http://localhost:3000/blog",
        // its always better to make use of environment variables for "redirect callback base url"
        destination: `/api/auth/signin?callbackUrl=${process.env.BASE_URL}/blog`,
        permanent: false
      }
    }
  }

  return {
    props: {
      // we can also send session detail as props for app to use from client side as well through "SessionProvider" context in "_app.js"
      session: userSession,
      data: userSession ? "list of personalized posts" : "list of free posts"
    }
  }
}

export default Blog