import { createSlice } from '@reduxjs/toolkit';
import { fetchUserList } from './thunks';

const initialState: any = {
    token: '',
    data: [],
    total: 0,
    per_page: 0,
    loading: false,
};

const idSlice = createSlice({
    name: 'id',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserList.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUserList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.total = action.payload.total;
                state.per_page = action.payload.per_page;
            })
            .addCase(fetchUserList.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const { setToken } = idSlice.actions;
export default idSlice.reducer;
