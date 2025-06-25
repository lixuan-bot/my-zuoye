import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8090",
    timeout: 3000,
})

export default http;