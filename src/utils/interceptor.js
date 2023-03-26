const { default: axios } = require("axios");

const client = axios.create({baseURL: "https://shazam-song-recognizer.p.rapidapi.com"})

export const shazamApiInterceptor = ({...options}) => {
    client.defaults.headers.common["X-RapidAPI-Key"] = process.env.NEXT_PUBLIC_RAPID_API_KEY
    client.defaults.headers.common["X-RapidAPI-Host"] = "shazam-song-recognizer.p.rapidapi.com"

    const onSuccess = response => response

    const onError = error => error

    return client(options).then(onSuccess).catch(onError)
}