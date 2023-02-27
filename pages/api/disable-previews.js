export default function handler (req, res) {
    // this will clear out cookies that were saved when preview mode was enables
    res.clearPreviewData();
    res.end("preview mode is disabled")

    // we can here also make use of a redirect after preview mode is disabled
    // this entire process can be mitigated with ui and based on our app needs
    // currently we are enabling and disbaling it from browser "url" address bar , which is not ideal for production level app
}