import Head from "next/head"

export default function HardCodedBlog({title, description}) {
  return (
    <main>
        <h1>HardCodedBlog</h1>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
        <h1 className="content">{title} ||--|| {description}</h1>
        {/* private and public key rendering at same time using env vars will throw an error, so either show one of them private or public one's not both simulataneously */}
        <h2>ENV variables Not Leaking To Browser By default In NextJs!! user: {process.env.DB_USER || "null"} -- password: {process.env.DB_PASS || "null"}</h2>
        <h3>ENV PUBLIC variables can be shown to browser if needed -- SOME CODE: {process.env.NEXT_PUBLIC_CODE || "null"} </h3>
    </main>
  )
}

export const getServerSideProps = async () => {
    // lets access environment variables, for an hypothetical usecase for a db data fetch
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASS;
    console.log(user, pass, "env vars")
    return {
        props: {
            title: "This is a title",
            description: "This is a description"
        }
    }
}