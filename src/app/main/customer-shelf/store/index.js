import { combineReducers } from '@reduxjs/toolkit'
import cusShelf from '../store/customerShelfSlice';
import customer from 'app/main/customer/store/customerSlice'

const reducer = combineReducers({
    cusShelf,
    customer
});

export default reducer;