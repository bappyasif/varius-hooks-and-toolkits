import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvider } from "styled-components"
import "@/styles/layout.css"
import "@/components/navbar/Navbar.css"
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

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
  // including layout within App
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Next JS Is Fuuuuunnnnn!!!!</title>
          <meta name='learning nextjs' content='a popular full react framework' />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </SessionProvider>
  )
  // return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
  // return <Component {...pageProps} />
}
