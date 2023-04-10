import { combineReducers } from '@reduxjs/toolkit'
import order from './orderSlice'
import customer from 'app/main/customer/store/customerSlice'
import product from 'app/main/product/store/productSlice'

const reducer = combineReducers({
    order,
    customer,
    product
});

export default reducer;