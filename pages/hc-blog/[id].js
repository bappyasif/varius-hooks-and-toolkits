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
    </main>
  )
}

export const getServerSideProps = async () => {
    return {
        props: {
            title: "This is a title",
            description: "This is a description"
        }
    }
}