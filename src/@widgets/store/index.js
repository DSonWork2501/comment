import { combineReducers } from '@reduxjs/toolkit'
import location from './locationsSlice'
import filter from './filtersSlice'

const reducer = combineReducers({
    location,
    filter
});

export default reducer;
