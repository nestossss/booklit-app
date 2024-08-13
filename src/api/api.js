import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if(!API_URL) console.log("api url nao existe")
if(API_URL) console.log("tudo certo: " + API_URL);

const api = axios.create({
    baseURL: 'http://192.168.3.103',
    headers: {
        "Content-Type":"application/x-www-form-urlencoded",
    }
});


export default api;;