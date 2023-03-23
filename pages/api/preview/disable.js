export default function handler (req, res) {
    // this will remove those cookies that were set after enabling it
    res.clearPreviewData()
    // res.end("preview mode is disabled")

    res.redirect(req.query.redirect)
}