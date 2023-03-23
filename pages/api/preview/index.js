export default function handler (req, res) {
    res.setPreviewData({name: "a.b."});
    
    // ideally this would come from or prvided by CMS, for which "url" to use for previewing
    res.redirect(req.query.redirect) // e.g. localhost:3000/api/preview?redirect=/for-preview/news

    // res.send("preview mode is enabled");
}