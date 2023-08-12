import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
    },
});
