import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import {storage} from '@widgets/functions'
import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "country";
/**
 * @description Get Country
 */
export const getCountry = createAsyncThunk(`${appName}/${moduleName}/getCountry`, async (params, thunkAPI) => {
    try {
        const stores = storage.getStorage(KeyStorage.country)
        if(stores) return stores
        const response = await connect.live.country.getList(params)
        const data = await response.data.data;
        storage.setStorage(KeyStorage.country, data)
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

const widgetCountrySlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description getCountry
         */
        [getCountry.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getCountry.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getCountry.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export default widgetCountrySlice.reducer;
