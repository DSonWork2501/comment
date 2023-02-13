import { combineReducers } from '@reduxjs/toolkit'
import account from './accountSlice'
import customer from './customerSlice'

const reducer = combineReducers({
    account,
    customer
});

export default reducer;