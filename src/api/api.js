import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.65.61:80",
    headers: {
        "Content-Type":"application/x-www-form-urlencoded",
    }
});


export default api;