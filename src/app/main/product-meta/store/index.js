import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions/GetErrorMessage';

const appName = "App";
const moduleName = "productMeta";

export const productMeta = {
    other: {
        getUnit: createAsyncThunk(`${appName}/${moduleName}/productMeta/other/getUnit`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.ads.other.getUnit(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),

    },
    meta: {
        getList: createAsyncThunk(`${appName}/${moduleName}/productMeta/meta/getList`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.productMeta.meta.getList(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        create: createAsyncThunk(`${appName}/${moduleName}/productMeta/meta/create`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.productMeta.meta.create(params.value, params.type);
                thunkAPI.dispatch(showMessage({ variant: "success", message: "Thêm mới thành công!" }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        update: createAsyncThunk(`${appName}/${moduleName}/productMeta/meta/update`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.productMeta.meta.update(params.value, params.type);
                thunkAPI.dispatch(showMessage({ variant: "success", message: "Cập nhật thành công!" }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        delete: createAsyncThunk(`${appName}/${moduleName}/productMeta/meta/delete`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.productMeta.meta.delete(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: "Xóa thành công!" }))
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

const productMetaSlice = createSlice({
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
                    }
                }
            }
        }
    },
    extraReducers: {
        [productMeta.meta.getList.pending]: state => ({
            ...state,
            loading: true,
            entities: {
                data: []
            },
            error: null
        }),
        [productMeta.meta.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [productMeta.meta.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            entities: {
                data: []
            },
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setPosition1, setPosition2, resetContractDetail, setContractDetail, resetIncome, resetForm } = productMetaSlice.actions;

export default productMetaSlice.reducer;