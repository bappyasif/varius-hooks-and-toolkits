export default function handler (req, res) {
    // whatever we pass in through this object, geteStaticProps and getServerSideProps will get access to them
    res.setPreviewData({user: "ab"})
    // we will also send message while ending this response
    // res.end("Preview mode is enabled!!")

    // when viewing this from browser, we will see two cookies been set in browser as well, namely "__prerender_bypass" and "__next_preview_data"
    // and will be sent with every request thereon

    // it is not expected that user would redirect themeselves to a "destination page" for preview
    // so it is our responsibility as a developer to redirect user to a page by accessing redirect url from request query parameter and from there we will begin process fro preview page
    // in our getStaticProps context will have a property called "preview" to be true and we can leverage it to suppliy appropriate articles for rendering
    res.redirect(req.query.redirect)
}