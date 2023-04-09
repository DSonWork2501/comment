import { combineReducers } from '@reduxjs/toolkit'
import order from './orderSlice'
import customer from 'app/main/customer/store/customerSlice'

const reducer = combineReducers({
    order,
    customer
});

export default reducer;