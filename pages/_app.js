import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvider } from "styled-components"
import "@/styles/layout.css"
import "@/components/navbar/Navbar.css"
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { MainNavigation } from '@/components/MainNavigation'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from 'react'

const theme = {
  colors: {
    primary: "darkred"
  }
}

export default function App({ Component, pageProps }) {
  // using only component based page layout
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  // Create a new QueryClient instance inside of your app, and on an instance ref (or in React state). 
  // This ensures that data is not shared between different users and requests, 
  // while still only creating the QueryClient once per component lifecycle
  const [queryClient] = useState(() => new QueryClient());

  // including layout within App
  return (
    // using session provider ensures that use of "useSession" hook through app compoenents tree are passed on for usage
    // it is highly recommended to use this in app layout page to reduce unnecessary network calls, page flickering and thus improving app performance

    // when we pass in user session data from server side to begin our app with or at some point of time during our use
    // we can simply add it to our SessionProvider context so that useSession hook can simply get hold of that information without have to refetch user session data, thus improving app performance by reducing network calls and removing ui flickering during data fetching
    // as we are passing "session" props from "/blog" getServerSideProps function we can access that by using "pageProps"

    // as SessionProvider gurantees less network calls on client side and thus reducing flickering once loaded
    // this "session" will guarantee access of session data to server side rendering, and thus not needed to re fetch sessiond data for each server side renderable pages
    // we can simply fetch and load "session" data once on app load from one of those server side rendered pages and serve it through SessionProvider context for rest of other route pages or components, so that on reload we dont have to refetch "session" data
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>

        {/* initiating react query provider */}
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>TanstackQueries.Axios.NextJS.Tailwind -- T.A.N.T.</title>
            <meta name='learning using t.a.n.t. together' content='a popular full react framework' />
          </Head>
          {/* <Header /> */}
          <MainNavigation />
          <Component {...pageProps} />

          {/* adding react query devtools */}
          <ReactQueryDevtools />
          
          <Footer />
        </QueryClientProvider>

      </ThemeProvider>
    </SessionProvider>
  )
  // return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
  // return <Component {...pageProps} />
}
