import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { InitOrderModal } from '../model/modal';
// import { getErrorMessage } from '@widgets/functions';


const appName = "orders";
const moduleName = "order";
/**
 * @description lấy danh sách product
 */
export const getList = createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.order.getList(params);
        const data = await response.data;
        return data
    } catch (error) {
        // thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description lấy chi tiết sản phẩm
 */
export const getDetail = createAsyncThunk(`${appName}/${moduleName}/getDetail`, async (params, thunkAPI) => {
    try {
        const { cusId, orderId } = params
        if (cusId && orderId && orderId !== "0") {
            const response = await connect.live.order.getDetail(cusId, orderId);
            const data = await response.data.data;
            return InitOrderModal({ entity: data })
        } else {
            return InitOrderModal({ customerid: cusId })
        }
    } catch (error) {
        // thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description lấy chi tiết sản phẩm
 */
export const insertOrder = createAsyncThunk(`${appName}/${moduleName}/insertOrder`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.order.insert(entity);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        return data

    } catch (error) {
        // thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description cập nhật trạng thái
 */
export const updateOrderStatus = createAsyncThunk(`${appName}/${moduleName}/status`, async (params, thunkAPI) => {
    try {
        const search = thunkAPI.getState().orders.order.search
        const response = await connect.live.order.update(params);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        thunkAPI.dispatch(getList(search))
        return data
    } catch (error) {
        // console.log('error', error)
        // thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

export const order = {
    other: {
        getSummary: createAsyncThunk(`${appName}/${moduleName}/order/other/getSummary`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getSummary(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        })
    }
}

const initSearchState = {
    cusId: null,
    orderId: '',
    status: '',
    homeSubscription: null,
    fromDate: '',
    toDate: '',
    pageNumber: 1,
    rowsPage: 10,
    cms: 1
}

const orderSlice = createSlice({
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
        * @description getEditors
        */
        [order.other.getSummary.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [order.other.getSummary.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                summary: payload,
                error: null
            }
        },
        [order.other.getSummary.rejected]: (state, { error }) => ({
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
         * @description updateOrderStatus
         */
        [updateOrderStatus.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [updateOrderStatus.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [updateOrderStatus.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description insertOrder
         */
        [insertOrder.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [insertOrder.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [insertOrder.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = orderSlice.actions;

export default orderSlice.reducer;