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

const client_internal = axios.create({baseURL: "http://localhost:4000"})

export const request_internal = ({...options}) => {
    const onSuccess = resp => resp

    const onError = err => err

    return client_internal(options).then(onSuccess).catch(onError)
}

const newsClient = axios.create({baseURL: "https://newsdata2.p.rapidapi.com"})

export const news_data_request_interceptor = ({...options}) => {
    newsClient.defaults.headers.common["X-RapidAPI-Key"] = secrets.RAPID_API_KEY
    newsClient.defaults.headers.common["X-RapidAPI-Host"] = "newsdata2.p.rapidapi.com"

    const onSuccess = response => response

    const onError = error => error

    return newsClient(options).then(onSuccess).catch(onError)
}