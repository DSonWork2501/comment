import Connect from "@connect/@connect";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListHS, searchDetail } from "app/main/product/store/productSlice";
import { showMessage } from "app/store/fuse/messageSlice";

const appName = "cusShelf";
const moduleName = "cusShelf";
/**
 * @description lấy danh sách tủ rượu
 */
export const getShelf = createAsyncThunk(`${appName}/${moduleName}/getShelf`, async (params, thunkAPI) => {
    try {
        const response = await Connect.live.customer.getShelf(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});
/**
 * @description lấy danh sách rượu
 */
export const getWine = createAsyncThunk(`${appName}/${moduleName}/getWine`, async (params, thunkAPI) => {
    try {
        const response = await Connect.live.customer.getWine(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

export const customerShelf = {
    other: {
        updateName: createAsyncThunk(`${appName}/${moduleName}/customerShelf/other/updateName`, async (params, thunkAPI) => {
            try {
                const response = await Connect.live.order.updateName(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        reOrder: createAsyncThunk(`${appName}/${moduleName}/customerShelf/other/reOrder`, async (params, thunkAPI) => {
            try {
                const response = await Connect.live.customer.other.reOrder(params);
                const data = await response.data;
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        reListOrder: createAsyncThunk(`${appName}/${moduleName}/customerShelf/other/reListOrder`, async (params, thunkAPI) => {
            try {
                const response = await Connect.live.customer.other.reListOrder(params);
                const data = await response.data;
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getSummary: createAsyncThunk(`${appName}/${moduleName}/customerShelf/other/getSummary`, async (params, thunkAPI) => {
            try {
                const response = await Connect.live.customer.other.getSummary(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getSummaryHousehold: createAsyncThunk(`${appName}/${moduleName}/customerShelf/other/getSummaryHousehold`, async (params, thunkAPI) => {
            try {
                const response = await Connect.live.customer.other.getSummaryHousehold(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
    }
}

const initSearchState = {
    CusID: null,//=> id khách hàng
    Type: "household",//=> loại (household - tủ/ wine- chai rượu)
    Status: null,//=> trạng thái: null- lấy all,1-chưa uống, 2-đã uống
    pageNumber: 2,
    rowsPage: 10,
}

const customerShelfSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        detailEntities: null,
        entity: null,
        error: null,
        selected: null,
        response: null,
        search: initSearchState,
        summary: null,
        summaryHousehold: null
        // hsLoading: false,
        // hsEntities: null,
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
         * @description getShelf
         */
        [getShelf.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getShelf.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getShelf.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        [customerShelf.other.getSummary.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [customerShelf.other.getSummary.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                summary: payload?.data,
                error: null
            }
        },
        [customerShelf.other.getSummary.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        [customerShelf.other.getSummaryHousehold.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [customerShelf.other.getSummaryHousehold.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                summaryHousehold: payload?.data,
                error: null
            }
        },
        [customerShelf.other.getSummaryHousehold.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        /**
         * @description getWines
         */
        [getWine.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getWine.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                detailEntities: payload,
                //detailEntities: { ...payload, data: payload.data.map(val => ({ ...val, slots: val.slots.map((va, e) => ({ ...va, item: { ...va.item, status: e === 1 ? 0 : 1 } })) })) },
                error: null
            }
        },
        [getWine.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

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
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = customerShelfSlice.actions;

export default customerShelfSlice.reducer;