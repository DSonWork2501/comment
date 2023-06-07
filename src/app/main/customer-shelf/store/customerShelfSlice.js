import Connect from "@connect/@connect";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const initSearchState = {
    CusID: null,//=> id khách hàng
    Type: "household",//=> loại (household - tủ/ wine- chai rượu)
    Status: null,//=> trạng thái: null- lấy all,1-chưa uống, 2-đã uống
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
                detailEntities: { ...payload, data: payload.data.map(val => ({ ...val, slots: val.slots.map((va, e) => ({ ...va, item: { ...va.item, status: e === 0 ? 0 : 1 } })) })) },
                error: null
            }
        },
        [getWine.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = customerShelfSlice.actions;

export default customerShelfSlice.reducer;