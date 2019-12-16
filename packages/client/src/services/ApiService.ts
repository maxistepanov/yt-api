import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

const parseData = <T>(response: AxiosResponse<T>): T => response.data;

class ApiService {
    private http = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });

    get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        return this.http.get<T>(url, config).then(parseData);
    };

    post = <T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<T> => {
        return this.http.post<T>(url, data, config).then(parseData);
    };
}

export default new ApiService();
