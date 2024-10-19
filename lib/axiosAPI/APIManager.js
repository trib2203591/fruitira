import axios from "axios";

const API = axios.create({
    baseURL: "http://192.168.1.6:3000",
    responseType: "json",
    timeout: 10000, // 10 seconds 
});

export default API