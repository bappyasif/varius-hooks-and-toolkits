// catch all routes for api routes
export default function handler (req, res) {
    const params = req.query.params;
    console.log(params)
    res.status(200).json(params)
}

// to include even "/api" to fall into this catch all routes
// we will have to rename this file name to [[...params]].js
// also doing so, we will have to remove "/api/index.js" otherwise this will be executed and served when found a request