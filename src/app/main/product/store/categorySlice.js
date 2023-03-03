import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'


const appName = "products";
const moduleName = "category";
/**
 * @description lấy danh sách category
 */
export const getList = createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.category.getList(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

/**
 * @description lấy info category
 */
export const getById = createAsyncThunk(`${appName}/${moduleName}/getById`, async (id, thunkAPI) => {
    try {
        const response = await connect.live.category.getList({ id });
        const data = await response?.data?.data?.find(e => true);
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

/**
 * @description edit category
 */
export const editCate = createAsyncThunk(`${appName}/${moduleName}/editCate`, async (entity, thunkAPI) => {
    try {
        const response = entity.id
            ? await connect.live.category.update([entity])
            : await connect.live.category.insert([entity]);
        const data = await response?.data?.data?.find(e => true);
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

/**
 * @description edit category
 */
export const changeStatus = createAsyncThunk(`${appName}/${moduleName}/changeStatus`, async (entity, thunkAPI) => {
    try {
        const search = thunkAPI.getState().products.category.search
        const response = await connect.live.category.changeStatus(entity)
        const data = await response?.data
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công!' }))
        thunkAPI.dispatch(getList(search));
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

const initSearchState = {
    id: '',
    name: '',
    type: '',
    status: '',
    pageNumber: 1,
    rowsPage: 10,
}

const categorySlice = createSlice({
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
         * @description editCate
         */
        [editCate.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [editCate.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [editCate.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getById
         */
        [getById.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getById.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entity: payload,
                error: null
            }
        },
        [getById.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description changeStatus
         */
        [changeStatus.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [changeStatus.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [changeStatus.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = categorySlice.actions;

export default categorySlice.reducer;