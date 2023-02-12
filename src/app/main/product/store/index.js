import { combineReducers } from '@reduxjs/toolkit'
import product from './productSlice'
import category from './categorySlice'

const reducer = combineReducers({
    product,
    category
});

export default reducer;