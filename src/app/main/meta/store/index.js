import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions/GetErrorMessage';

const appName = "App";
const moduleName = "meta";

export const meta = {
    userDelivery: {
        getList: createAsyncThunk(`${appName}/${moduleName}/userDelivery/getList`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.meta.userDelivery.getList(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getCode: createAsyncThunk(`${appName}/${moduleName}/userDelivery/getCode`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.meta.userDelivery.getCode(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
    },
}

const initSearchState = {
    page: 1,
    limit: 10,
    type: 1
}

const metaSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        selected: null,
        search: initSearchState,
        user: null,
        code:null
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

        resetContractDetail: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    contractDetail: null
                }
            }
        },

        setContractDetail: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    contractDetail: payload
                }
            }
        },

        resetIncome: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    incomes: {
                        data: []
                    }
                }
            }
        },

        resetForm: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    form: {
                        data: []
                    },
                    subForm: {
                        data: []
                    },
                    tickets: {
                        data: []
                    },
                }
            }
        },

        updateState: (state, action) => {
            const newState = action.payload(state);
            return newState;
        },
    },
    extraReducers: {
        [meta.userDelivery.getList.pending]: (state, { payload }) => {
            return {
                ...state,
                loading: true,
                user: {
                    data: []
                },
                error: null
            }
        },
        [meta.userDelivery.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                user: payload,
                error: null
            }
        },
        [meta.userDelivery.getList.rejected]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                user: {
                    data: []
                },
                error: null
            }
        },
        
        [meta.userDelivery.getCode.pending]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                code: null,
                error: null
            }
        },
        [meta.userDelivery.getCode.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                code: payload.data,
                error: null
            }
        },
    }
});

export const { setSelected, setSearch, resetSearch, setPosition1, setPosition2, resetContractDetail, setContractDetail, resetIncome, resetForm, updateState } = metaSlice.actions;

export default metaSlice.reducer;