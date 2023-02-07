import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'

const appName = "Widgets";
const moduleName = "uploadimage";
/**
 * @description Upload image
 */

 export const uploadImage = createAsyncThunk(`${appName}/${moduleName}/uploadImage`, async (entity, thunkAPI) => {
    try {
        const {formData, setValue} = entity
        const response = await connect.live.landingPage.uploadImage(formData)
        setValue && setValue(response.data.data.path)
        return response
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error?.response?.data?.errors[0]?.message }))
        return error
    }
})

const widgetCategoriesSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loadingUploadImage: false,
        entities: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description uploadImage
         */
         [uploadImage.pending]: state => ({
            ...state,
            loadingUploadImage: true,
            error: null
        }),
        [uploadImage.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loadingUploadImage: false,
                response: payload,
                error: null
            }
        },
        [uploadImage.rejected]: (state, { error }) => ({
            ...state,
            loadingUploadImage: false,
            error: error
        }),
	}
})

export default widgetCategoriesSlice.reducer
