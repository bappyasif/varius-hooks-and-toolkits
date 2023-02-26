import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvider } from "styled-components"
import "@/styles/layout.css"
import Head from 'next/head'

const theme = {
  colors: {
    primary: "darkred"
  }
}

export default function App({ Component, pageProps }) {
  // using only component based page layout
  if(Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }
  // including layout within App
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Next JS Is Fuuuuunnnnn!!!!</title>
        <meta name='learning nextjs' content='a popular full react framework' />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
  // return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
  // return <Component {...pageProps} />
}
