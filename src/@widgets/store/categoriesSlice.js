import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import {storage} from '@widgets/functions'
import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "Categories";
/**
 * @description Get Categories
 */
export const getCategories = createAsyncThunk(`${appName}/${moduleName}/getCategories`, async (params, thunkAPI) => {
    try {
        const stores = storage.getStorage(KeyStorage.categories)
        if(stores) return stores
        const response = await connect.live.editor.getCategory({type: 0})
        const data = await response.data.data
        storage.setStorage(KeyStorage.categories, data)
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

const widgetCategoriesSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description getCategories
         */
        [getCategories.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getCategories.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getCategories.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
})

export default widgetCategoriesSlice.reducer
