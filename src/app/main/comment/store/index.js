import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions';

const appName = "App";
const moduleName = "comment";


export const comment = {
    getList: createAsyncThunk(`${appName}/${moduleName}/comment/getList`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.comment.getList(params);
            // console.log("CHECK >>>", response.data.data);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),

}

const commentSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        selected: null,
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
        [comment.getList.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [comment.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [comment.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            entities: {
                data: []
            },
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setPosition1, setPosition2, setEntities } = commentSlice.actions;

export default commentSlice.reducer;
