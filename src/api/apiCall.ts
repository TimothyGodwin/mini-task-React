import axios from 'axios';

const apiRequest = async (endpoint: string, method: string, params: any = {}) => {
    try {
        const response = await axios({
            method,
            url: endpoint,
            params,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default apiRequest;
