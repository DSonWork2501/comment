import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'


const appName = "customers";
const moduleName = "partner";

const partner = {
    getList: createAsyncThunk(`${appName}/${moduleName}/partner/getList`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.getList(params);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    create: createAsyncThunk(`${appName}/${moduleName}/partner/create`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.create(params);
            thunkAPI.dispatch(showMessage({ variant: "success", message: "Thêm mới thành công!" }))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    update: createAsyncThunk(`${appName}/${moduleName}/partner/update`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.update(params);
            thunkAPI.dispatch(showMessage({ variant: "success", message: "Cập nhật thành công!" }))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    delete: createAsyncThunk(`${appName}/${moduleName}/partner/delete`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.delete(params);
            thunkAPI.dispatch(showMessage({ variant: "success", message: "Xóa thành công!" }))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
}

const initSearchState = {
    pageNumber: 1,
    rowsPage: 10,
}

const partnerSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        selected: null,
        response: null,
        search: initSearchState,
    },
    reducers: {
        /**
         * @description Selected a Object
         */
        setSelected: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    selected: payload
                }
            },
            prepare: item => ({ payload: item })
        },
        /**
         * Set search on table
         */
        setSearch: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    search: payload
                }
            },
            prepare: item => ({ payload: item })
        },
        /**
         * Reset search on table
         */
        resetSearch: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    search: initSearchState
                }
            }
        },
        /**
         * set isEdit
         */
        setIsEdit: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    isEdit: payload
                }
            }
        },
    },
    extraReducers: {
        /**
         * @description getEditors
         */
        [getList.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = partnerSlice.actions;

export default partnerSlice.reducer;