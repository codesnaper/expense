import axios from 'axios';
import { Configuration } from '../config/Configuration';

const api = axios.create({
    baseURL: Configuration.baseUrl,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000,
    timeoutErrorMessage: 'Server not responded . Try again after some time.',
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken != null && config != null && config.headers != null) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
        if(config.url !== 'login'){
            localStorage.clear();
            window.location.reload();
        }
    }
    return config;
});

api.interceptors.response.use(
    function (successRes) {
        return successRes;
    },
    function (error) {
        if (error.message.indexOf('401') !== -1 && error.config.url.indexOf('login') === -1) {
            localStorage.clear();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default api;

