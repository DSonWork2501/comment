import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '@connect';
import {showMessage} from 'app/store/fuse/messageSlice'

const appName = "Widgets";
const moduleName = "sport";
/**
 * @description Get byId sport
 */
export const getSportById = createAsyncThunk(`${appName}/${moduleName}/getSportById`, async (sportId, thunkAPI) => {
    try {
        const response = await connect.live.sport.getSportByID(sportId)
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({variant: "error", message: error.message}))
    }
});

/**
 * @description Get list sport
 */
 export const getListSport = createAsyncThunk(`${appName}/${moduleName}/getListSport`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.sport.getListSport(params)
        const data = await response.data;
        return data
    } catch (error) {
        return error
    }
});

/**
 * @description Get List Style Sport
 */
export const getListStyleSport = createAsyncThunk(`${appName}/${moduleName}/getListStyleSport`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.sport.getListStyleSport(params.id, params.entities);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

/**
 * @description Get List Style Sport
 */
export const getListAllSubSport = createAsyncThunk(`${appName}/${moduleName}/getListAllSubSport`, async (params, thunkAPI) => {
    try {
        const response = await connect.live.sport.getListStyleSport(params.id, params.entities);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

/**
 * @description Get List Style Sport
 */
export const getListSubSport = createAsyncThunk(`${appName}/${moduleName}/getListSubSport`, async (id, thunkAPI) => {
    try {
        const response = await connect.live.sport.getListSubSport(id);
        const data = await response.data;
        return data
    } catch (error) {
        thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
        return error
    }
});

/**
 * @description Get List Section App
 */
 export const getSectionApp = createAsyncThunk(`${appName}/${moduleName}/getSectionApp`, async (params, thunkAPI) => {
    try {
      const response = await connect.live.sport.getSectionMenuOTT(params);
      const data = await response.data;
      return data
    } catch (error) {
      thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
      return error
    }
  });
  
  /**
   * @description Get List Menu OTT
   */
   export const getMenuOTT = createAsyncThunk(`${appName}/${moduleName}/getSectionMenuOTT`, async (params, thunkAPI) => {
    try {
      const response = await connect.live.sport.getSectionMenuOTT(params);
      const data = await response.data;
      return data
    } catch (error) {
      thunkAPI.dispatch(showMessage({ variant: "error", message: error.message }))
      return error
    }
  });

const initSearchState = {
    title: "",
}

const widgetSportSlice = createSlice({
	name: `${appName}/${moduleName}`,
	initialState: {
        loading: false,
        entity: null,
        entityStyleSport: null,
        entityMenuOTT: null,
        entitySectionApp: null,
        entityListAllSubSport: null,
        error: null,
        entities: [],
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
         * @description getSportById
         */
        [getSportById.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getSportById.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                entity: payload,
                error: null
            }
        },
        [getSportById.rejected]: (state, {error}) => ({
            ...state,
            loading: false,
            error: error
        }),

        /**
         * @description get list style Sport
         */
        [getListStyleSport.pending]: state => ({
        ...state,
            loading: true,
            error: null
        }),
        [getListStyleSport.fulfilled]: (state, { payload }) => {
            return {
            ...state,
            loading: false,
            entityStyleSport: payload,
            error: null
            }
        },
        [getListStyleSport.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        /**
         * @description get list style Sport
         */
        [getListSubSport.pending]: state => ({
        ...state,
            loading: true,
            error: null
        }),
        [getListSubSport.fulfilled]: (state, { payload }) => {
            return {
            ...state,
            loading: false,
            entitySubSport: payload,
            error: null
            }
        },
        [getListSubSport.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
        /**
         * @description get Menu OTT
         */
        [getMenuOTT.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getMenuOTT.fulfilled]: (state, { payload }) => {
            return {
            ...state,
            loading: false,
            entityMenuOTT: payload,
            error: null
            }
        },
        [getMenuOTT.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
  
        /**
        * @description get Section App
        */
        [getSectionApp.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getSectionApp.fulfilled]: (state, { payload }) => {
            return {
            ...state,
            loading: false,
            entitySectionApp: payload,
            error: null
            }
        },
        [getSectionApp.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        /**
        * @description get List All SubSport
        */
        [getListAllSubSport.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getListAllSubSport.fulfilled]: (state, { payload }) => {
            return {
            ...state,
            loading: false,
            entityListAllSubSport: payload,
            error: null
            }
        },
        [getListAllSubSport.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),

        /**
        * @description getListSport
        */
        [getListSport.pending]: state => ({
            ...state,
            loading: true,
            error: null
        }),
        [getListSport.fulfilled]: (state, { payload }) => {
            return {
            ...state,
            loading: false,
            entities: payload,
            error: null
            }
        },
        [getListSport.rejected]: (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        }),
	}
});

export const { setSelected, setSearch, resetSearch } = widgetSportSlice.actions;

export default widgetSportSlice.reducer;
