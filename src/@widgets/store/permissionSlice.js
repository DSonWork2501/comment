import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'

const appName = "Widgets";
const moduleName = "permission";
/**
 * @description Get Permission
 */
export const getPermission = createAsyncThunk(`${appName}/${moduleName}/getPermission`, async (params, thunkAPI) => {
    try {
        let auth = thunkAPI.getState().auth
        let roleID = (auth && auth.user && auth.user.user && auth.user.user.roleID) || ""
        let departmentID = (auth && auth.user && auth.user.user && auth.user.user.departmentID) || ""
        if(roleID && departmentID){
            const response = await connect.live.role.getPermission(roleID, departmentID)
            const data = await response.data.data;
            return data
        }
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

const widgetSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description getPermission
         */
        [getPermission.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getPermission.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getPermission.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export default widgetSlice.reducer;
