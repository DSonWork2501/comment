import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'
import { storage } from '@widgets/functions';
import { KeyStorage } from '@widgets/metadatas';

const appName = "Widgets";
const moduleName = "person";
/**
 * @description Get list person
 */
export const getPersons = createAsyncThunk(`${appName}/${moduleName}/getPersons`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.person.getListPerson(params)
        const data = await response.data.data;
        storage.setStorage(KeyStorage.person, data)
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
})

/**
 * @description Get person by id
 */
 export const getPersonById = createAsyncThunk(`${appName}/${moduleName}/getPersonById`, async (id, thunkAPI) => {
    try {
        const response = await connect.live.person.getPersonById(id)
        const data = await response.data.data
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
})

const widgetSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
    },
	extraReducers: {
        /**
         * @description getPersons
         */
        [getPersons.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getPersons.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getPersons.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getPersonById
         */
        [getPersonById.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getPersonById.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entity: payload,
                error: null
            }
        },
        [getPersonById.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export default widgetSlice.reducer;
