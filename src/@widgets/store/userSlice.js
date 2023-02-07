import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import {storage} from '@widgets/functions'
import {KeyStorage} from '@widgets/metadatas'
import history from '@history'
import { logoutUser } from 'app/auth/store/userSlice';

const appName = "Widgets";
const moduleName = "user";
/**
 * @description Get User
 */
export const getUser = createAsyncThunk(`${appName}/${moduleName}/getUser`, async (params, thunkAPI) => {
    try {
        const stores = storage.getStorage(KeyStorage.users)
        if(stores) return stores
        const response = await connect.live.user.getList({Page:1, Limit:1000})
        const data = await response.data.data;
        storage.setStorage(KeyStorage.users, data)
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
})

/**
 * @description Get User by id
 */
export const getUserById = createAsyncThunk(`${appName}/${moduleName}/getUserById`, async (userId, thunkAPI) => {
    try {
        const response = await connect.live.user.getById(userId)
        const data = await response.data.data;
        return data
    } catch (error) {
        return error
    }
})

/**
 * @description update User Simple Info
 */
 export const updateUserSimpleInfo = createAsyncThunk(`${moduleName}/updateUserSimpleInfo`, async (entity, thunkAPI) => {
    try {
        if (entity && entity.id && entity.id > 0) {
            let response = await connect.live.user.info(entity.id, entity)
            let data = await response.data
            thunkAPI.dispatch(showMessage({variant: "success", message: "Cập nhật thành công, vui lòng đăng nhập lại!"}))
            thunkAPI.dispatch(logoutUser())
            history.push("/login")
            return data
        }
    } catch (error) {
        return error
    }
})

const widgetCountrySlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        response: null
    },
	extraReducers: {
        /**
         * @description getUser
         */
        [getUser.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getUser.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getUser.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getUserByIdc
         */
        [getUserById.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getUserById.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entity: payload,
                error: null
            }
        },
        [getUserById.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description updateUserSimpleInfo
         */
        [updateUserSimpleInfo.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [updateUserSimpleInfo.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [updateUserSimpleInfo.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export default widgetCountrySlice.reducer;
