import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions';
import { productMeta } from 'app/main/product-meta/store';
import { getList as getCategory } from "./categorySlice";

const appName = "products";
const moduleName = "product";
/**
 * @description lấy danh sách product
 */
export const getList = createAsyncThunk(`${appName}/${moduleName}/getList`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getList(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description lấy danh sách product home supscription
 */
export const getListHS = createAsyncThunk(`${appName}/${moduleName}/getListHS`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getList(params);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description lấy danh sách product
 */
export const getDetail = createAsyncThunk(`${appName}/${moduleName}/getDetail`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getDetail(params);
        const data = await response.data;
        thunkAPI.dispatch(getColor())
        thunkAPI.dispatch(getSize())
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description lấy danh sách product
 */
export const searchDetail = createAsyncThunk(`${appName}/${moduleName}/searchDetail`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.product.getDetail(params);
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description thêm sản phẩm
 */
export const insertProduct = createAsyncThunk(`${appName}/${moduleName}/insertProduct`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.insert(entity);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description cập nhật sản phẩm
 */
export const updateProduct = createAsyncThunk(`${appName}/${moduleName}/updateProduct`, async (entity, thunkAPI) => {
    try {
        const { details } = entity
        if (details?.length) {
            const modal = [...details]?.map(x => ({
                "uniqueid": x.uniqueid,
                "retailprice": x.retailprice,
                "wholesaleprice": x.wholesaleprice,
                "temporaryprice": x.temporaryprice,
                "price": x.price,
                "discount": 0,
                "vat": 0
            }))
            if (modal) {
                const priceResponse = await thunkAPI.dispatch(insertProPrice(modal))
                if (!priceResponse?.payload?.result) {
                    thunkAPI.dispatch(showMessage({ variant: "error", message: '' }))
                }
            }
        }

        const response = await connect.live.product.update(entity);
        const data = await response.data;
        thunkAPI.dispatch(showMessage({ variant: "success", message: 'Thao tác thành công !' }))
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description lấy bảng màu
 */
export const getColor = createAsyncThunk(`${appName}/${moduleName}/getColor`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.getColor(entity);
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description lấy bảng màu
 */
export const getSize = createAsyncThunk(`${appName}/${moduleName}/getSize`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.getSize(entity);
        const data = await response.data.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description upload hình ảnh
 */
export const uploadImage = createAsyncThunk(`${appName}/${moduleName}/uploadImage`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.uploadImage(entity);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

/**
 * @description upload hình ảnh
 */
export const getHistoryPrice = createAsyncThunk(`${appName}/${moduleName}/getHistoryPrice`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.getHistoryPrice(entity);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});
/**
 * @description insert price
 */
export const insertProPrice = createAsyncThunk(`${appName}/${moduleName}/insertProPrice`, async (entity, thunkAPI) => {
    try {
        const response = await connect.live.product.price.insert(entity);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
        return error
    }
});

export const product = {
    delete: createAsyncThunk(`${appName}/${moduleName}/delete`, async (entity, thunkAPI) => {
        try {
            const response = await connect.live.product.delete(entity);
            thunkAPI.dispatch(showMessage({ variant: "success", message: 'Xóa thành công !' }))
            const data = await response.data;
            return data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return thunkAPI.rejectWithValue(error)
        }
    }),
    other: {
        removeProperties: createAsyncThunk(`${appName}/${moduleName}/other/removeProperties`, async (entity, thunkAPI) => {
            try {
                const response = await connect.live.product.other.removeProperties(entity);
                thunkAPI.dispatch(showMessage({ variant: "success", message: 'Xóa thành công !' }))
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return thunkAPI.rejectWithValue(error)
            }
        }),
        addProductCate: createAsyncThunk(`${appName}/${moduleName}/other/addProductCate`, async (entity, thunkAPI) => {
            try {
                const response = await connect.live.product.other.addProductCate(entity);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return thunkAPI.rejectWithValue(error)
            }
        }),
        removeProductCate: createAsyncThunk(`${appName}/${moduleName}/other/removeProductCate`, async (entity, thunkAPI) => {
            try {
                const response = await connect.live.product.other.removeProductCate(entity);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return thunkAPI.rejectWithValue(error)
            }
        }),
        wineArrange: createAsyncThunk(`${appName}/${moduleName}/other/wineArrange`, async (entity, thunkAPI) => {
            try {
                const response = await connect.live.product.other.wineArrange(entity);
                const data = await response.data;
                return data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return thunkAPI.rejectWithValue(error)
            }
        }),
    }
}

export const initSearchState = {
    search: '',
    cate: '',
    branch: '',
    fromPrice: '',
    toPrice: '',
    certification: '',
    pageNumber: 1,
    rowsPage: 10,
}

const productSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        imgLoading: false,
        priceLoading: false,
        entities: null,
        historyPrice: null,
        hsLoading: false,
        hsEntities: null,
        searchDetailEntities: null,
        searchDetailLoading: false,
        entity: null,
        error: null,
        selected: null,
        response: null,
        search: initSearchState,
        color: null,
        size: null,
        insertPrice: null,
        certification: [],
        madeIn: [],
        classify: [],
        unit: [],
        brands: [],
        cates: [],
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
    },
    extraReducers: {
        /**
         * @description getEditors
         */
        [getList.pending]: state => ({
            ...state,
            loading: true,
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
            error: error
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
                entity: { ...payload, data: { ...payload.data, certification: payload.data.certificationid } },
                error: null
            }
        },
        [getDetail.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getColor
         */
        [getColor.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getColor.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                color: payload,
                error: null
            }
        },
        [getColor.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getSize
         */
        [getSize.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getSize.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                size: payload,
                error: null
            }
        },
        [getSize.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description searchDetail
         */
        [searchDetail.pending]: state => ({
            ...state,
            searchDetailLoading: true,
            error: null
        }),
        [searchDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                searchDetailLoading: false,
                searchDetailEntities: payload,
                error: null
            }
        },
        [searchDetail.rejected]: (state, { error }) => ({
            ...state,
            searchDetailLoading: false,
            error: error
        }),
        /**
         * @description getListHS
         */
        [getListHS.pending]: state => ({
            ...state,
            hsLoading: true,
            error: null
        }),
        [getListHS.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                hsLoading: false,
                hsEntities: payload,
                error: null
            }
        },
        [getListHS.rejected]: (state, { error }) => ({
            ...state,
            hsLoading: false,
            error: error
        }),
        /**
         * @description uploadImage
         */
        [uploadImage.pending]: state => ({
            ...state,
            imgLoading: true,
            error: null
        }),
        [uploadImage.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                imgLoading: false,
                response: payload,
                error: null
            }
        },
        [uploadImage.rejected]: (state, { error }) => ({
            ...state,
            imgLoading: false,
            error: error
        }),
        /**
         * @description getHistoryPrice
         */
        [getHistoryPrice.pending]: state => ({
            ...state,
            priceLoading: true,
            error: null
        }),
        [getHistoryPrice.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                priceLoading: false,
                historyPrice: payload,
                error: null
            }
        },
        [getHistoryPrice.rejected]: (state, { error }) => ({
            ...state,
            priceLoading: false,
            error: error
        }),
        /**
         * @description insertProPrice
         */
        [insertProPrice.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [insertProPrice.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                insertPrice: payload,
                error: null
            }
        },
        [insertProPrice.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),


        [productMeta.meta.getList.fulfilled]: (state, { payload, meta }) => {
            let { arg } = meta;

            if (arg?.type === 1 && payload?.data)
                return {
                    ...state,
                    loading: false,
                    brands: payload?.data,
                    error: null
                }

            if (arg?.type === 2 && payload?.data)
                return {
                    ...state,
                    loading: false,
                    certification: payload?.data,
                    error: null
                }

            if (arg?.type === 4 && payload?.data)
                return {
                    ...state,
                    loading: false,
                    madeIn: payload?.data,
                    error: null
                }


            if (arg?.type === 3 && payload?.data)
                return {
                    ...state,
                    loading: false,
                    classify: payload?.data,
                    error: null
                }


            if (arg?.type === 5 && payload?.data)
                return {
                    ...state,
                    loading: false,
                    unit: payload?.data,
                    error: null
                }
            return {
                ...state,
                loading: false,
                error: null
            }
        },

        [getCategory.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                cates: payload,
                error: null
            }
        },
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit, setStateRedux } = productSlice.actions;

export default productSlice.reducer;