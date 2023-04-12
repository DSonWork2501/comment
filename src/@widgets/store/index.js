import { combineReducers } from '@reduxjs/toolkit'
import location from './locationsSlice'

const reducer = combineReducers({
    location
});

export default reducer;
