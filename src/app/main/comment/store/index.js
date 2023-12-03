import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions';

const appName = "comments";
const moduleName = "comment";


export const comment = {
    getList: createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.comment.getList(params);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
}

const initSearchState = {
    pageNumber: 1,
    rowsPage: 10,
}


const commentSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        search: initSearchState,
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
         * Set search on table
         */
        // setSearch: {
        //     reducer: (state, { payload }) => {
        //         return {
        //             ...state,
        //             search: payload
        //         }
        //     },
        //     prepare: item => ({ payload: item })
        // },
        // resetSearch: {
        //     reducer: (state, { payload }) => {
        //         return {
        //             ...state,
        //             search: initSearchState
        //         }
        //     }
        // },
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

export const { setSelected, setSearch, resetSearch } = commentSlice.actions;

export default commentSlice.reducer;
