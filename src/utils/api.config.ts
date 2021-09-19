import axios from 'axios';

const api = axios.create({
    baseURL: 'https://experiment-api.herokuapp.com/api',
});

export default api;
