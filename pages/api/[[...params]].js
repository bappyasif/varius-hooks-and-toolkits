// in order to cover even "index" api then we will have to use "optional catch all routes" (i.e. [[...params]].js)
// catch all routes (i.e. [...params].js) covers "all other endpoints" except "index"

export default function handler (req, res) {
    const params = req.query.params;
    console.log(params, "PARAMS!!")
    res.status(200).json(params)
}