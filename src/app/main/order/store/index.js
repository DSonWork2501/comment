import { combineReducers } from '@reduxjs/toolkit'
import order from './orderSlice'
import customer from 'app/main/customer/store/customerSlice'
import product from 'app/main/product/store/productSlice'
import contract from 'app/main/contract/store/contractSlice'

const reducer = combineReducers({
    order,
    customer,
    product,
    contract
});

export default reducer;