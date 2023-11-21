import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions';

const appName = "App";
const moduleName = "notify";


export const notify = {
    getList: createAsyncThunk(`${appName}/${moduleName}/notification/getList`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.notification.getList(params);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    read: createAsyncThunk(`${appName}/${moduleName}/notification/read`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.notification.read(params);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    deleteAll: createAsyncThunk(`${appName}/${moduleName}/notification/deleteAll`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.notification.deleteAll(params);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
}

const initSearchState = {
    page: 1,
    limit: 10
}

const notifySlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        selected: null,
        search: initSearchState,
    },
    reducers: {
        /**
         * @description Selected a Object
         */
        setSelected: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    selected: payload
                }
            },
            prepare: item => ({ payload: item })
        },
        /**
         * @description position 1
         */
        setPosition1: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    position1: payload
                }
            },
            prepare: item => ({ payload: item })
        },
        /**
         * @description position 2
         */
        setPosition2: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    position2: payload
                }
            },
            prepare: item => ({ payload: item })
        },
        /**
         * Set search on table
         */
        setSearch: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    search: payload
                }
            },
            prepare: item => ({ payload: item })
        },
        /**
         * Reset search on table
         */
        resetSearch: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    search: initSearchState
                }
            }
        },
        /**
         * Reset search on table
         */
        setEntities: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    entities: payload
                }
            }
        },
    },
    extraReducers: {
        [notify.getList.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [notify.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [notify.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            entities: {
                data: []
            },
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setPosition1, setPosition2, setEntities } = notifySlice.actions;

export default notifySlice.reducer;
