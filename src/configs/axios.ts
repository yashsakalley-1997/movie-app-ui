import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    },
})

export default apiClient; 