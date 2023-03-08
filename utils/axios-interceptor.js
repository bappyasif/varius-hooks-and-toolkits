import { secrets } from "@/secrets";
import axios from "axios";

const client = axios.create({baseURL: "https://rawg-video-games-database.p.rapidapi.com"})

export const rapid_external_axios_request = ({...options}) => {
    // client.defaults.headers.common["X-RapidAPI-Key"] = process.env.RAPID_API_KEY;
    client.defaults.headers.common["X-RapidAPI-Key"] = secrets.RAPID_API_KEY;
    client.defaults.headers.common["X-RapidAPI-Host"] = "rawg-video-games-database.p.rapidapi.com";

    const onSuccess = response => response;
    const onError = error => {
        // we can do any other logging or logic needed to be here for our app requirements
        // after that we will have to return it back to interceptor
        return error
    }

    // once done we return this interceptor back to client
    return client(options).then(onSuccess).catch(onError)
}

export const internal_axios_request = () => axios.create({baseURL: "http://localhost:4000"})

// export const rapi_external_axios_request = () =>  axios.create({baseURL: "https://rawg-video-games-database.p.rapidapi.com", })