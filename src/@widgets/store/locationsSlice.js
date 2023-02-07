import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import {storage} from '@widgets/functions'
import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "areas";

/**
 * @description Get Locations
 */
export const getLocations = createAsyncThunk(`${appName}/${moduleName}/getLocations`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.Schedule3G.getLocations()
        const data = await response.data.data;
        storage.setStorage(KeyStorage.locations, data)
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

const widgetFoldersSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description getFolders
         */
        [getLocations.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getLocations.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getLocations.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export default widgetFoldersSlice.reducer;