import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
// import {storage} from '@widgets/functions'
// import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "product";

/**
 * @description Get Locations
 */
export const getOrigin = createAsyncThunk(`${appName}/${moduleName}/getOrigin`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.filter.get({ ...params, type: 1 })
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
    }
});

export const getType = createAsyncThunk(`${appName}/${moduleName}/getType`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.filter.get({ ...params, type: 2 })
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
    }
});

export const getConcentration = createAsyncThunk(`${appName}/${moduleName}/getConcentration`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.filter.get({ ...params, type: 3 })
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
    }
});

const widgetFiltersSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        xuatxu: [],
        phanloai: null,
        nongdo: null,
        error: null,
    },
    extraReducers: {
        /**
         * @description getOrigin
         */
        [getOrigin.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getOrigin.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                xuatxu: payload,
                error: null
            }
        },
        [getOrigin.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getType
         */
        [getType.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getType.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                phanloai: payload,
                error: null
            }
        },
        [getType.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getConcentration
         */
        [getConcentration.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getConcentration.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                nongdo: payload,
                error: null
            }
        },
        [getConcentration.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

    }
});

export default widgetFiltersSlice.reducer;