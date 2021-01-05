import axios from "axios";


export const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fd404da8-ea6d-494b-90d2-bb5c412e9027'
    }
});



