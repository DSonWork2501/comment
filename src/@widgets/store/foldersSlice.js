import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import {storage} from '@widgets/functions'
import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "folders";

/**
 * @description Get Folders
 */
export const getFolders = createAsyncThunk(`${appName}/${moduleName}/getFolders`, async (params, thunkAPI) => {
    try {
        const stores = storage.getStorage(KeyStorage.folders)
        if(stores) return stores
        const response = await connect.live.folder.getList()
        const data = await response.data.data;
        storage.setStorage(KeyStorage.folders, data)
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
        [getFolders.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getFolders.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getFolders.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export default widgetFoldersSlice.reducer;