import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { InitOrderModal } from '../model/modal';
import { getWine, getShelf } from 'app/main/customer-shelf/store/customerShelfSlice';
import { getErrorMessage } from '@widgets/functions';
import { partner } from 'app/main/customer/store/partnerSlice';
// import { getErrorMessage } from '@widgets/functions';


const appName = "orders";
const moduleName = "order";
/**
 * @description lấy danh sách product
 */
export const getList = createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.order.getList(params);
        const data = await response.data;
        return data
    } catch (error) {
        // thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description lấy chi tiết sản phẩm
 */
export const getDetail = createAsyncThunk(`${appName}/${moduleName}/getDetail`, async (params, thunkAPI) => {
    try {
        const { cusId, orderId } = params
        if (cusId && orderId && orderId !== "0") {
            const response = await connect.live.order.getDetail(cusId, orderId);
            const data = await response.data.data;
            return InitOrderModal({ entity: data })
        } else {
            return InitOrderModal({ customerid: cusId })
        }
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return (thunkAPI.rejectWithValue(error))
    }
});

/**
 * @description lấy chi tiết sản phẩm
 */
export const insertOrder = createAsyncThunk(`${appName}/${moduleName}/insertOrder`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.order.insert(entity);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        return data

    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return (thunkAPI.rejectWithValue(error))
    }
});

/**
 * @description cập nhật trạng thái
 */
export const updateOrderStatus = createAsyncThunk(`${appName}/${moduleName}/status`, async (params, thunkAPI) => {
    try {
        //const search = thunkAPI.getState().orders.order.search
        const response = await connect.live.order.update(params);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        //thunkAPI.dispatch(getList(search))
        return data
    } catch (error) {
        // // console.log('error', error)
        // thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

export const order = {
    shipper: {
        insert: createAsyncThunk(`${appName}/${moduleName}/order/shipper/insert`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.shipper.insert(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        update: createAsyncThunk(`${appName}/${moduleName}/order/shipper/update`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.shipper.update(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getDetailShipDelivery: createAsyncThunk(`${appName}/${moduleName}/order/other/getDetailShipDelivery`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.shipper.getDetailShipDelivery(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
    },
    other: {
        getPayment: createAsyncThunk(`${appName}/${moduleName}/order/other/getPayment`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getPayment(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getUserDelivery: createAsyncThunk(`${appName}/${moduleName}/order/other/getUserDelivery`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getUserDelivery(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getVehicles: createAsyncThunk(`${appName}/${moduleName}/order/other/getVehicles`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getVehicles(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getSummary: createAsyncThunk(`${appName}/${moduleName}/order/other/getSummary`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getSummary(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        updateNote: createAsyncThunk(`${appName}/${moduleName}/order/other/updateNote`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.updateNote(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getDelivery: createAsyncThunk(`${appName}/${moduleName}/order/other/getDelivery`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getDelivery(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getDeliveryList: createAsyncThunk(`${appName}/${moduleName}/order/other/getDeliveryList`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getDelivery(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        getDetailDelivery: createAsyncThunk(`${appName}/${moduleName}/order/other/getDetailDelivery`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.order.other.getDetailDelivery(params);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
    },
    cancel: createAsyncThunk(`${appName}/${moduleName}/order/cancel`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.order.cancel(params);
            thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
            const data = await response.data;
            return data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
}

const initSearchState = {
    cusId: null,
    orderId: '',
    status: '',
    homeSubscription: null,
    fromDate: '',
    toDate: '',
    pageNumber: 1,
    rowsPage: 10,
    cms: 1
}

const orderSlice = createSlice({
    name: `${appName} /${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        selected: null,
        response: null,
        search: initSearchState,
        popupLoading: false,
        storeOrders: [],
        btnLoading: false
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
         * set isEdit
         */
        setIsEdit: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    isEdit: payload
                }
            }
        },

        setStateRedux: {
            reducer: (state, { payload }) => {
                return {
                    ...state,
                    ...payload
                }
            },
        },

        // removeDetailSearchProduct: {
        //     reducer: (state, { payload }) => {
        //         const updatedProduct = { ...state.orders };
        //         //delete updatedProduct.searchDetailEntities;
        //         console.log(updatedProduct);
        //         // Return a new state object with the updated product
        //         return {
        //             ...state,
        //             product: updatedProduct,
        //         };
        //     },
        // },
    },
    extraReducers: {
        /**
         * @description getEditors
         */
        [getList.pending]: state => ({
            ...state,
            loading: true,
            entities: {
                data: []
            },
            error: null
        }),
        [getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            entities: {
                data: []
            },
            error: error
        }),
        /**
        * @description getEditors
        */
        [order.other.getSummary.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [order.other.getSummary.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                summary: payload,
                error: null
            }
        },
        [order.other.getSummary.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        [order.other.getDetailDelivery.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [order.other.getDetailDelivery.fulfilled]: (state, { payload, meta }) => {
            const { arg } = meta, { orderID, status } = arg;
            let data = { ...payload };
            let temp = payload.data.map(val => {
                return {
                    ...val, productorder: val.productorder.map(va => {
                        const item = { ...va };

                        if (item?.model)
                            item.model = JSON.stringify(JSON.parse(item.model).map(ite => {
                                return {
                                    ...ite, slots: ite.slots.map(it => {
                                        return { ...it, item: { ...it.item, price: it.item?.temporaryprice || 0 } }
                                    })
                                }
                            }))
                        return item
                    })
                }
            })
            data = { ...data, data: temp.filter(val => (orderID ? val.id === parseInt(orderID) : true) && (status ? val.shipping.status === status : true)) }

            return {
                ...state,
                loading: false,
                detailDelivery: data,
                error: null
            }
        },
        [order.other.getDetailDelivery.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        [order.shipper.getDetailShipDelivery.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [order.shipper.getDetailShipDelivery.fulfilled]: (state, { payload, meta }) => {
            const { arg } = meta, { orderID, status } = arg;
            let data = { ...payload };
            let temp = payload.data.map(val => {
                return {
                    ...val, productorder: val.productorder.map(va => {
                        const item = { ...va };

                        if (item?.model)
                            item.model = JSON.stringify(JSON.parse(item.model).map(ite => {
                                return {
                                    ...ite, slots: ite.slots.map(it => {
                                        return { ...it, item: { ...it.item, price: it.item?.temporaryprice || 0 } }
                                    })
                                }
                            }))
                        return item
                    })
                }
            })

            data = { ...data, data: temp.filter(val => (orderID ? val.id === parseInt(orderID) : true) && (status ? val.shipping.status === status : true)) }

            return {
                ...state,
                loading: false,
                detailDelivery: data,
                error: null
            }
        },
        [order.shipper.getDetailShipDelivery.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),


        [order.other.getDeliveryList.pending]: state => ({
            ...state,
            loading: true,
            deliveryList: null,
            error: null
        }),
        [order.other.getDeliveryList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                deliveryList: payload,
                error: null
            }
        },
        [order.other.getDeliveryList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        /**
       * @description getEditors
       */
        [order.other.getDelivery.fulfilled]: (state, { payload }) => ({
            ...state,
            deliveries: payload?.data,
            loading: false,
        }),
        /**
         * @description getDetail
         */
        [getDetail.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entity: payload,
                error: null
            }
        },
        [getDetail.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description updateOrderStatus
         */
        [updateOrderStatus.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [updateOrderStatus.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [updateOrderStatus.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description insertOrder
         */
        [insertOrder.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [insertOrder.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                response: payload,
                error: null
            }
        },
        [insertOrder.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        [getWine.pending]: (state, { payload }) => {
            return {
                ...state,
                popupLoading: true,
                detailEntities: {
                    data: []
                },
                error: null
            }
        },

        [getWine.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                popupLoading: false,
                detailEntities: payload,
                error: null
            }
        },

        [getWine.rejected]: (state, { payload }) => {
            return {
                ...state,
                popupLoading: false,
                detailEntities: {
                    data: []
                },
                error: null
            }
        },

        [getShelf.pending]: (state, { payload }) => {
            return {
                ...state,
                popupLoading: true,
                detailEntities: {
                    data: []
                },
                error: null
            }
        },

        [getShelf.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                popupLoading: false,
                detailEntities: payload,
                error: null
            }
        },

        [getShelf.rejected]: (state, { payload }) => {
            return {
                ...state,
                popupLoading: false,
                detailEntities: {
                    data: []
                },
                error: null
            }
        },

        [order.shipper.update.pending]: (state, { payload }) => {
            return {
                ...state,
                btnLoading: true,
            }
        },
        [order.shipper.update.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                btnLoading: false,
            }
        },
        [order.shipper.update.rejected]: (state, { payload }) => {
            return {
                ...state,
                btnLoading: false,
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
        [order.other.getVehicles.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                vehicles: payload,
                error: null
            }
        },
        [order.other.getPayment.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                payments: payload,
                error: null
            }
        },

        [partner.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                partner: payload,
                error: null
            }
        },
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit, setStateRedux } = orderSlice.actions;

export default orderSlice.reducer;