import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import {storage} from '@widgets/functions'
import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "reasons";

/**
 * @description Get Folders
 */
export const getReasonDown = createAsyncThunk(`${appName}/${moduleName}/getReasonDown`, async (params, thunkAPI) => {
    try {
        const stores = storage.getStorage(KeyStorage.reasons)
        if(stores) return stores
        const response = await connect.live.editor.downreason.getReasonDown()
        const data = await response.data.data;
        storage.setStorage(KeyStorage.reasons, data)
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

const widgetReasonDownSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description getReasonDown
         */
        [getReasonDown.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getReasonDown.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getReasonDown.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export default widgetReasonDownSlice.reducer;