import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://booklit-api-ts.onrender.com";

if(!API_URL) console.log("api url nao existe")
if(API_URL) console.log("tudo certo: " + API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type":"application/x-www-form-urlencoded",
    }
});

export default api;