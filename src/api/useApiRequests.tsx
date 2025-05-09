import { AxiosInstance } from 'axios';
import { API_CONFIG } from './endpoint';
import useCustomAxios from './useCustomAxios';
import { useState } from 'react';

interface QueryParams {
    [key: string]: object;
}

type ApiMethod = 'get' | 'post' | 'put' | 'delete';

interface ApiConfig {
    url: string;
}

const useApiRequests = (apiName: string, method: ApiMethod) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const axiosInstance: AxiosInstance = useCustomAxios();
    const api: ApiConfig | undefined = API_CONFIG[apiName];

    const apiCalls = async (payload: any = null, queryParams: QueryParams = {}, pathParams: any = {}) => {
        setLoading(true);
        setError(null);
        if (!api) {
            throw new Error('API configuration not found');
        }

        let url = api.url;
        if (Object.keys(pathParams).length > 0) url += `/${Object.values(pathParams).join('/')}`;
        if (Object.keys(queryParams).length > 0) {
            const queryString = new URLSearchParams(
                Object.entries(queryParams).map(([key, value]) => [
                    key,
                    typeof value === 'object' ? JSON.stringify(value) : String(value),
                ])
            ).toString();

            url += `?${queryString}`;
        }

        try {
            const response = await axiosInstance({
                method: method,
                url: url,
                data: payload,
            });

            return response.data;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    };

    return { apiCalls, loading, error };;
};

export default useApiRequests;
