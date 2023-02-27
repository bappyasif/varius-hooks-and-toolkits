function PreviewNews({data}) {
  return (
    <main>
        <h1>PreviewNews</h1>
        <h2 className="content">{data}</h2>
    </main>
  )
}

export const getStaticProps = async context => {
    // once built and preview is enabled, this will be executed on each request thereon
    // thus its possible to see any changes been made to see it on preview without have to re build entire app
    // previewData will be shown only when preview mode is activated, otherwise undefined
    // typically in previewData we will set "session" related data which is required for page data rendering
    // previewData is also available in getServerSideProps function as well
    // fyi, preview mode is really important when a cms is part of our app
    
    // environments can be accessed directly without using PREFIX fropm getStaticProps or getServerSideProps or from API routes
    console.log("running getStaticProps", context.previewData, process.env.USER)

    // we also need to account for disable preview mode, otherwise we wil kjeep seeing preview mode after it need has been met
    // and we will do so by using another api endpoint which will clear out saved cookies and thus disabling preview mode for viewing
    return {
        props: {data: context.preview ? "All drafts news articles" : "All published News articles"}
    }
}

export default PreviewNews