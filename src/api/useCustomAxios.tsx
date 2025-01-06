import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

axios.defaults.baseURL = 'https://reqres.in/api';

const useCustomAxios = (): AxiosInstance => {
    const token: any = useSelector((state: any) => state?.id?.token);

    useEffect(() => {
        const isTokenAvailable = !!token;

        const requestInterceptor = axios.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (isTokenAvailable) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [token]);

    return axios;
};

export default useCustomAxios;
