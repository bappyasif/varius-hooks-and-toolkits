import { secrets } from "@/secrets";

const { default: axios } = require("axios");

const client = axios.create({baseURL: "https://shazam-song-recognizer.p.rapidapi.com"})

export const shazam_axios_interceptor_client = ({...options}) => {
    client.defaults.headers.common["X-RapidAPI-Key"] = secrets.RAPID_API_KEY;
    client.defaults.headers.common["X-RapidAPI-Host"] = "shazam-song-recognizer.p.rapidapi.com"

    const onSuccess = response => response;

    const onError = err => err

    return client(options).then(onSuccess).catch(onError)
}