import axios, { AxiosInstance } from 'axios';

interface useApiResponse {
    http: AxiosInstance;
}

export const useApi = (): useApiResponse => {
    const baseURL = process.env.REACT_APP_API_URL;
    const http = axios.create({
        baseURL,
    });

    return {
        http,
    };
};
