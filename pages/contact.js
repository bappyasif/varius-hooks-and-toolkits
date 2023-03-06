import styles from "styles/Contact.module.css"
import style from "@/styles/Contact.module.scss"
import Footer from "@/components/Footer"
import Head from "next/head"
function ContactPage() {
  return (
    // lets also include a Head Component so that we can make better use of SEO
    <>
      {/* <Head>
      <title>Contact Page</title>
      <meta name="description" content="Ways to reach us" />
    </Head> */}
      <main className='container container-fluid'>
        {/* when using component level styling, same classname wont collide with any other css component modules namespace and in extension with global css modules namespace either */}
        {/* this can be handy to be certain about keeping componnet centric styling in that module and wont be affected by any other external modules */}
        <h1 className={styles.highlight}>ContactPage</h1>
        <h1 className={style.highlightScss}>ContactPage</h1>
      </main>
    </>
  )
}

// individual page based layout
ContactPage.getLayout = function PageLayout(page) {
  return (
    <>
      <Head>
        <title>Contact Page</title>
        {/* <meta name="description" content="Ways to reach us" /> */}
      </Head>
      {page}
      <Footer />
    </>
  )
}

export default ContactPage