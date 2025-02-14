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
        setData: (state, action) => {
            const newData = action.payload;
            const existingIndex = state.data.findIndex((item: any) => item.id === newData.id);
            if (existingIndex !== -1) {
                state.data[existingIndex] = { ...state.data[existingIndex], ...newData };
            } else {
                state.data.unshift(newData);
            }
        },
        setDeleteData: (state, action) => {
            const idToDelete = action.payload.id;
            const indexToDelete = state.data.findIndex((item: any) => item.id === idToDelete);
            if (indexToDelete !== -1) {
                state.data.splice(indexToDelete, 1);
            }
        },
        setDeleteDataMulti: (state, action) => {
            const idToDelete = action.payload;
            console.log("idsToDelete ", idToDelete);
            state.data = state.data.filter(item => !idToDelete.includes(item.id));

        }
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

export const { setToken, setData, setDeleteData, setDeleteDataMulti } = idSlice.actions;
export default idSlice.reducer;
