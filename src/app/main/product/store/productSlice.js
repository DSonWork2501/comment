import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions';


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
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description lấy danh sách product home supscription
 */
export const getListHS = createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getList(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
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
        thunkAPI.dispatch(getColor())
        thunkAPI.dispatch(getSize())
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description lấy danh sách product
 */
export const searchDetail = createAsyncThunk(`${appName}/${moduleName}/searchDetail`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getDetail(params);
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description thêm sản phẩm
 */
export const insertProduct = createAsyncThunk(`${appName}/${moduleName}/insertProduct`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.insert(entity);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description cập nhật sản phẩm
 */
export const updateProduct = createAsyncThunk(`${appName}/${moduleName}/updateProduct`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.update(entity);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description lấy bảng màu
 */
export const getColor = createAsyncThunk(`${appName}/${moduleName}/getColor`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.getColor(entity);
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description lấy bảng màu
 */
export const getSize = createAsyncThunk(`${appName}/${moduleName}/getSize`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.getSize(entity);
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
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
        hsLoading: false,
        hsEntities: null,
        searchDetailEntities: null,
        searchDetailLoading: false,
        entity: null,
        error: null,
        selected: null,
        response: null,
        search: initSearchState,
        color: null,
        size: null,
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
        /**
         * @description getColor
         */
        [getColor.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getColor.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                color: payload,
                error: null
            }
        },
        [getColor.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getSize
         */
        [getSize.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getSize.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                size: payload,
                error: null
            }
        },
        [getSize.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description searchDetail
         */
        [searchDetail.pending]: state => ({
            ...state,
            searchDetailLoading: true,
            error: null
        }),
        [searchDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                searchDetailLoading: false,
                searchDetailEntities: payload,
                error: null
            }
        },
        [searchDetail.rejected]: (state, { error }) => ({
            ...state,
            searchDetailLoading: false,
            error: error
        }),
        /**
         * @description getListHS
         */
        [getListHS.pending]: state => ({
            ...state,
            hsLoading: true,
            error: null
        }),
        [getListHS.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                hsLoading: false,
                hsEntities: payload,
                error: null
            }
        },
        [getListHS.rejected]: (state, { error }) => ({
            ...state,
            hsLoading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = productSlice.actions;

export default productSlice.reducer;