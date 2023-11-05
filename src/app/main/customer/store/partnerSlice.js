import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice'
import { getErrorMessage } from '@widgets/functions';


const appName = "customers";
const moduleName = "partner";

export const partner = {
    getList: createAsyncThunk(`${appName}/${moduleName}/partner/getList`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.getList(params);
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    create: createAsyncThunk(`${appName}/${moduleName}/partner/create`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.create(params);
            thunkAPI.dispatch(showMessage({ variant: "success", message: "Thêm mới thành công!" }))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    update: createAsyncThunk(`${appName}/${moduleName}/partner/update`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.update(params);
            thunkAPI.dispatch(showMessage({ variant: "success", message: "Cập nhật thành công!" }))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    delete: createAsyncThunk(`${appName}/${moduleName}/partner/delete`, async (params, thunkAPI) => {
        try {
            const response = await connect.live.partner.delete(params);
            thunkAPI.dispatch(showMessage({ variant: "success", message: "Xóa thành công!" }))
            return response.data
        } catch (error) {
            thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
            return (thunkAPI.rejectWithValue(error))
        }
    }),
    member: {
        getList: createAsyncThunk(`${appName}/${moduleName}/partner/member/getList`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.partner.member.getList(params);
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        update: createAsyncThunk(`${appName}/${moduleName}/partner/member/update`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.partner.member.update(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: "Thành công!" }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
        invite: createAsyncThunk(`${appName}/${moduleName}/partner/member/invite`, async (params, thunkAPI) => {
            try {
                const response = await connect.live.partner.member.invite(params);
                thunkAPI.dispatch(showMessage({ variant: "success", message: "Thành công!" }))
                return response.data
            } catch (error) {
                thunkAPI.dispatch(showMessage({ variant: "error", message: getErrorMessage(error) }))
                return (thunkAPI.rejectWithValue(error))
            }
        }),
    }
}

const initSearchState = {
    pageNumber: 1,
    rowsPage: 10,
}

const partnerSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entities: null,
        entity: null,
        error: null,
        selected: null,
        response: null,
        search: initSearchState,
        members: null
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
    },
    extraReducers: {
        /**
         * @description getEditors
         */
        [partner.getList.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [partner.getList.fulfilled]: (state, { payload }) => {

            return {
                ...state,
                loading: false,
                entities: {
                    ...payload, data: Boolean(payload?.data?.length) ? [...payload.data].sort((a, b) => {
                        if (a.id !== b.id) {
                            return b.id - a.id; // Sort by 'id' property
                        } else {
                            // If 'id' is the same, sort by 'default' property
                            return a.default ? -1 : 1;
                        }
                    }) : []
                },
                error: null
            }
        },
        [partner.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        [partner.member.getList.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [partner.member.getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                members: payload,
                error: null
            }
        },
        [partner.member.getList.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch, setIsEdit } = partnerSlice.actions;

export default partnerSlice.reducer;