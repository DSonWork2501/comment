import { combineReducers } from '@reduxjs/toolkit'
import account from './accountSlice'
import customer from './customerSlice'
import partner from './partnerSlice'

const reducer = combineReducers({
    account,
    customer,
    partner
});

export default reducer;