import { combineReducers } from '@reduxjs/toolkit'
import order from './orderSlice'

const reducer = combineReducers({
    order
});

export default reducer;