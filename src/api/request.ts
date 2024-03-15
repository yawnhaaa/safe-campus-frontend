import axios from 'axios';
import { getToken } from '@/utils/auth'

const url = "http://127.0.0.1:8080/api"

export const request = axios.create({
    baseURL: url,
})

export const requestJWT = axios.create({
    baseURL: url,
})

requestJWT.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
})