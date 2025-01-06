import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../api/apiCall';
import showNotification from '../../components/notification/Notification';

interface FetchUserListResponse {
    data: any;
    total: number;
    per_page: number;
}

export const fetchUserList = createAsyncThunk<FetchUserListResponse, number, { rejectValue: string }>(
    'users/fetchUserList',
    async (pageNo, { rejectWithValue }) => {
        try {
            const params = { page: pageNo };
            const response = await apiRequest('users', 'get', params);

            return {
                data: response.data,
                total: response.total,
                per_page: response.per_page,
            };
        } catch (error) {
            showNotification.ERROR('Something went wrong');
            return rejectWithValue('Something went wrong');
        }
    }
);
