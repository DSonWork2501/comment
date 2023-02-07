import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import {storage} from '@widgets/functions'
import {KeyStorage} from '@widgets/metadatas'

const appName = "Widgets";
const moduleName = "department";
/**
 * @description Get danh sách phòng ban
 */
export const getDepartment = createAsyncThunk(`${appName}/${moduleName}/getDepartment`, async (params, thunkAPI) => {
    try {
        const stores = storage.getStorage(KeyStorage.department)
        if(stores) return stores
        const response = await connect.live.department.getList()
        const data = await response.data.data
        storage.setStorage(KeyStorage.department, data)
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

const widgetDepartmentSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: [],
        error: null,
    },
	extraReducers: {
        /**
         * @description getDepartment
         */
        [getDepartment.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getDepartment.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getDepartment.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
})

export default widgetDepartmentSlice.reducer
