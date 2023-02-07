import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { storage } from '@widgets/functions'
import { KeyStorage } from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "copyright";
/**
 * @description Get Copyright
 */
export const getCopyright = createAsyncThunk(`${appName}/${moduleName}/getCopyright`, async (isNew, thunkAPI) => {
    try {
        if (isNew) {
            await storage.removeStorage(KeyStorage.copyright)
            const response = await connect.live.copyright.getList()
            const data = await [{ id: 0, nameCopyRight: "Không Có" }, ...response.data.data];
            storage.setStorage(KeyStorage.copyright, data)
            return data
        } else {
            const stores = storage.getStorage(KeyStorage.copyright)
            if (stores) return stores
            const response = await connect.live.copyright.getList()
            const data = await [{ id: 0, nameCopyRight: "Không Có" }, ...response.data.data];
            storage.setStorage(KeyStorage.copyright, data)
            return data
        }


    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
    }
});

const widgetCopyrightSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        error: null,
    },
    extraReducers: {
        /**
         * @description getCopyright
         */
        [getCopyright.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getCopyright.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getCopyright.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export default widgetCopyrightSlice.reducer;
