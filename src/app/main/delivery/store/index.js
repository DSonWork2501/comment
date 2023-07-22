import { combineReducers } from '@reduxjs/toolkit'
import order from 'app/main/order/store/orderSlice'

const reducer = combineReducers({
    order
});

export default reducer;