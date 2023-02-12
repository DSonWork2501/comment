import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'

const reducer = combineReducers({
    product
});

export default reducer;