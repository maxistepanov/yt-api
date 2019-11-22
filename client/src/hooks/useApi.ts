import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface useApiInstance {
    http: AxiosInstance;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T>;
}

export const useApi = (): useApiInstance => {
    const baseURL = process.env.REACT_APP_API_URL;
    const http = axios.create({
        baseURL,
    });

    function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return http
            .get<T>(url, config)
            .then((response: AxiosResponse<T>): T => response.data);
    }

    function post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return http
            .post<T>(url, data, config)
            .then((response: AxiosResponse<T>): T => response.data);
    }

    return {
        http,
        get,
        post,
    };
};
