import axios from "axios";

export const axios_request = axios.create({
    baseURL: "http://localhost:4000"
})