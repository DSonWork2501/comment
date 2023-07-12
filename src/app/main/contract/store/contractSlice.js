import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'


const appName = "contractsOrder";
const moduleName = "contractsOrder";
/**
 * @description lấy danh sách customer
 */
export const getList = createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.contract.getList(params);
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});
/**
 * @description lấy detail
 */
export const getById = createAsyncThunk(`${appName}/${moduleName}/getById`, async (id, thunkAPI) => {
    try {
        const response = await connect.live.contract.getList({ contractid: id });
        const data = await response.data.data.find(e => true);
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

/**
 * @description lấy editContract
 */
export const editContract = createAsyncThunk(`${appName}/${moduleName}/editContract`, async (entity, thunkAPI) => {
    try {
        const response = entity[0].id === 0 ? await connect.live.contract.insert(entity) : await connect.live.contract.update(entity);
        const data =  response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return (thunkAPI.rejectWithValue(error))
    }
});
/**
 * @description chuyển status
 */
export const statusContract = createAsyncThunk(`${appName}/${moduleName}/statusContract`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.contract.changeStatus(entity)
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'thao tác thành công !' }))
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

const initSearchState = {
    contractId: '',
}

const contractSlice = createSlice({
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
         * @description editContract
         */
        [editContract.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [editContract.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [editContract.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description statusContract
         */
        [statusContract.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [statusContract.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [statusContract.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = contractSlice.actions;

export default contractSlice.reducer;