import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
// import {storage} from '@widgets/functions'
// import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "location";

/**
 * @description Get Locations
 */
export const getCity = createAsyncThunk(`${appName}/${moduleName}/getCity`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.location.getList({...params, type: 'CITY'})
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

export const getDistrict = createAsyncThunk(`${appName}/${moduleName}/getDistrict`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.location.getList({...params, type: 'DISTRICT'})
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

export const getWard = createAsyncThunk(`${appName}/${moduleName}/getWard`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.location.getList({...params, type: 'WARD'})
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

const widgetLocationsSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        cityLoading: false,
        districtLoading: false,
        wardLoading: false,
        citys: null,
        districts: null,
        wards: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description getCity
         */
        [getCity.pending]: state => ({
            ...state,
            cityLoading: true,
            error: null
        }),
        [getCity.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                cityLoading: false,
                citys: payload,
                error: null
            }
        },
        [getCity.rejected]: (state, {error}) => ({
            ...state,
            cityLoading: false,
            error: error
        }),
        /**
         * @description getDistrict
         */
        [getDistrict.pending]: state => ({
            ...state,
            districtLoading: true,
            error: null
        }),
        [getDistrict.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                districtLoading: false,
                districts: payload,
                error: null
            }
        },
        [getDistrict.rejected]: (state, {error}) => ({
            ...state,
            districtLoading: false,
            error: error
        }),
        /**
         * @description getWard
         */
        [getWard.pending]: state => ({
            ...state,
            wardLoading: true,
            error: null
        }),
        [getWard.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                wardLoading: false,
                wards: payload,
                error: null
            }
        },
        [getWard.rejected]: (state, {error}) => ({
            ...state,
            wardLoading: false,
            error: error
        }),
        
	}
});

export default widgetLocationsSlice.reducer;