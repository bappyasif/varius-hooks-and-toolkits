import axios from "axios";

const client = axios.create({baseURL: "http://localhost:4000"})

export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer ${1234}`;
    const onSuccess = response => response;
    const onError = error => {
        // we can do any other logging or logic needed to be here for our app requirements
        // after that we will have to return it back to interceptor
        return error
    }

    // once done we return this interceptor back to client
    return client(options).then(onSuccess).catch(onError)
}