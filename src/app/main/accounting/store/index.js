import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions/GetErrorMessage';
import { order } from 'app/main/order/store/orderSlice';

const appName = "App";
const moduleName = "accounting";

export const accounting = {
    other: {
        getUnit: createAsyncThunk(`${appName}/${moduleName}/accounting/other/getUnit`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.ads.other.getUnit(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),

    },
    income: {
        insert: createAsyncThunk(`${appName}/${moduleName}/income/insert`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.income.insert(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        confirm: createAsyncThunk(`${appName}/${moduleName}/income/confirm`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.income.confirm(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getList: createAsyncThunk(`${appName}/${moduleName}/income/getList`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.income.getList(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getSummary: createAsyncThunk(`${appName}/${moduleName}/income/getSummary`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.income.getSummary(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
    },
    bill: {

        getList: createAsyncThunk(`${appName}/${moduleName}/bill/getList`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.getList(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        createCollect: createAsyncThunk(`${appName}/${moduleName}/bill/createCollect`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.createCollect(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getCollect: createAsyncThunk(`${appName}/${moduleName}/bill/getCollect`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.getCollect(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getCollectBill: createAsyncThunk(`${appName}/${moduleName}/bill/getCollectBill`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.getCollectBill(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getCollectBillPhone: createAsyncThunk(`${appName}/${moduleName}/bill/getCollectBillPhone`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.getCollectBillPhone(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getCollectOrder: createAsyncThunk(`${appName}/${moduleName}/bill/getCollectOrder`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.getCollectOrder(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getCollectOrderPhone: createAsyncThunk(`${appName}/${moduleName}/bill/getCollectOrderPhone`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.getCollectOrderPhone(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        update: createAsyncThunk(`${appName}/${moduleName}/bill/update`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.bill.update(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
    },
    meta: {
        getList: createAsyncThunk(`${appName}/${moduleName}/accounting/meta/getList`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.meta.getList(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        create: createAsyncThunk(`${appName}/${moduleName}/accounting/meta/create`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.meta.create(params.value, params.type);
                thunkAPI.dispatch(showMessage({ variant: "success", message: "Thêm mới thành công!" }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        update: createAsyncThunk(`${appName}/${moduleName}/accounting/meta/update`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.meta.update(params.value, params.type);
                thunkAPI.dispatch(showMessage({ variant: "success", message: "Cập nhật thành công!" }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        delete: createAsyncThunk(`${appName}/${moduleName}/accounting/meta/delete`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.accounting.meta.delete(params.value, params.type);
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

const accountingSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        selected: null,
        collections: null,
        search: initSearchState,
        collectionBill: null,
        collectionOrder: null,
        incomes: null,
        summary: null
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
        },

        setReduxState: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    ...payload
                }
            }
        },
    },
    extraReducers: {
        [accounting.meta.getList.pending]: state => ({
            ...state,
            loading: true,
            entities: {
                data: []
            },
            error: null
        }),
        [accounting.meta.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [accounting.meta.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            entities: {
                data: []
            },
            error: error
        }),

        [accounting.bill.getList.pending]: state => ({
            ...state,
            loading: true,
            entities: {
                data: []
            },
            error: null
        }),
        [accounting.bill.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [accounting.bill.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            entities: {
                data: []
            },
            error: error
        }),


        [accounting.bill.getCollect.pending]: state => ({
            ...state,
            loading: true,
            collections: {
                data: []
            },
            error: null
        }),
        [accounting.bill.getCollect.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                collections: payload,
                error: null
            }
        },
        [accounting.bill.getCollect.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            collections: {
                data: []
            },
            error: error
        }),

        [accounting.bill.getCollectBill.pending]: state => ({
            ...state,
            loading: true,
            collectionBill: {
                data: []
            },
            error: null
        }),
        [accounting.bill.getCollectBill.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                collectionBill: payload,
                error: null
            }
        },
        [accounting.bill.getCollectBill.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            collectionBill: {
                data: []
            },
            error: error
        }),

        [accounting.bill.getCollectOrder.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                //loading: false,
                collectionOrder: payload,
                error: null
            }
        },


        [accounting.bill.getCollectOrderPhone.pending]: state => ({
            ...state,
            loading: true,
            collectionOrder: {
                data: []
            },
            error: null
        }),
        [accounting.bill.getCollectOrderPhone.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                collectionOrder: payload,
                error: null
            }
        },
        [accounting.bill.getCollectOrderPhone.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            collectionOrder: {
                data: []
            },
            error: error
        }),

        [accounting.income.getList.pending]: state => ({
            ...state,
            loading: true,
            incomes: {
                data: []
            },
            error: null
        }),
        [accounting.income.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                incomes: payload,
                error: null
            }
        },
        [accounting.income.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            incomes: {
                data: []
            },
            error: error
        }),

        [accounting.bill.getCollectBillPhone.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                collectionBill: payload,
                error: null
            }
        },

        [order.other.getUserDelivery.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                userDelivery: payload,
                error: null
            }
        },

        [accounting.income.getSummary.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                summary: payload?.data,
                error: null
            }
        },
    }
});

export const { setSelected, setSearch, resetSearch, setPosition1, setPosition2, resetContractDetail, setContractDetail, resetIncome, resetForm, setReduxState } = accountingSlice.actions;

export default accountingSlice.reducer;