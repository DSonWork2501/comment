import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';

const appName = "Widgets";
const moduleName = "editor";
/**
 * @description Get editor by Id 
 */
export const getEditorById = createAsyncThunk(`${appName}/${moduleName}/getEditorById`, async (editorId, thunkAPI) => {
    try {
        const response = await connect.live.editor.getById(editorId)
        const data = await response.data;
        return data
    } catch (error) {
        return error
    }
});

/**
 * @description Get list editor
 */
export const getListEditor = createAsyncThunk(`${appName}/${moduleName}/getListEditor`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.editor.getList(params)
        const data = await response.data;
        return data
    } catch (error) {
        return error
    }
});

const initSearchState = {
    editorId: "",
    typeMovie: null,
    title: "",
    articleAssgin: "",
    linkAssign: "",
    folder: "",
    release: "",
    publishCountry: "",
    stateArticle: "",
    stateLink: "",
    copyRight: "",
    DownType: "",
    AgeNGender: "",
    age: "",
    gender: "",
    titleAddLink: "",
    copyRightID: ""
}

const widgetEditorSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        entity: null,
        entities: [],
        selected: null,
        error: null,
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
    },
    extraReducers: {
        /**
         * @description getEditorById
         */
        [getEditorById.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getEditorById.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entity: payload,
                error: null
            }
        },
        [getEditorById.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description getListEditor
         */
        [getListEditor.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getListEditor.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entities: payload,
                error: null
            }
        },
        [getListEditor.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
    }
});

export const { setSelected, setSearch, resetSearch } = widgetEditorSlice.actions;

export default widgetEditorSlice.reducer;
