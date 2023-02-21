import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'


const appName = "products";
const moduleName = "product";
/**
 * @description lấy danh sách product
 */
export const getList = createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getList(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});
/**
 * @description lấy danh sách product
 */
export const getDetail = createAsyncThunk(`${appName}/${moduleName}/getDetail`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getDetail(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});



const initSearchState = {
    search: '',
    cate: '',
    branch: '',
    fromPrice: '',
    toPrice: '',
    certification: '',
    pageNumber: 1,
    rowsPage: 10,
}

const productSlice = createSlice({
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
        /**
         * @description getDetail
         */
        [getDetail.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entity: payload,
                error: null
            }
        },
        [getDetail.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = productSlice.actions;

export default productSlice.reducer;